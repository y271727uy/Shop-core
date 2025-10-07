package org.tab.shop_core.block.entity;

import net.minecraft.core.BlockPos;
import net.minecraft.core.particles.ParticleTypes;
import net.minecraft.nbt.CompoundTag;
import net.minecraft.nbt.ListTag;
import net.minecraft.nbt.Tag;
import net.minecraft.network.chat.Component;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.server.level.ServerLevel;
import net.minecraft.sounds.SoundEvents;
import net.minecraft.sounds.SoundSource;
import net.minecraft.world.InteractionHand;
import net.minecraft.world.InteractionResult;
import net.minecraft.world.entity.Entity;
import net.minecraft.world.entity.EntityType;
import net.minecraft.world.entity.player.Player;
import net.minecraft.world.item.Item;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.level.Level;
import net.minecraft.world.level.block.entity.BlockEntity;
import net.minecraft.world.level.block.entity.BlockEntityType;
import net.minecraft.world.level.block.state.BlockState;
import net.minecraft.world.phys.AABB;
import net.minecraftforge.registries.ForgeRegistries;
import org.tab.shop_core.Shop_core;
import org.tab.shop_core.config.ShopConfigManager;
import org.tab.shop_core.util.FoodQualityUtil;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.Random;
import java.util.Map;
import java.util.HashMap;

public class ShopCounterBlockEntity extends BlockEntity {
    public static final BlockEntityType<ShopCounterBlockEntity> TYPE = BlockEntityType.Builder.of(
            ShopCounterBlockEntity::new, 
            Shop_core.SHOP_COUNTER.get()
    ).build(null);
    
    private Set<String> menuItems = new HashSet<>();
    private boolean isShopOpen = false;
    private int customerSpawnTimer = 0;
    private boolean isFirstCustomerSpawned = false;
    private static final Random random = new Random();
    
    // 添加预生成订单缓存
    private static final Map<Integer, String> ORDER_CACHE = new HashMap<>();
    static {
        // 预生成一些订单模板
        ORDER_CACHE.put(1, "订单: 经典汉堡, 薯条, 可乐");
        ORDER_CACHE.put(2, "订单: 芝士汉堡, 沙拉, 橙汁");
        ORDER_CACHE.put(3, "订单: 双层汉堡, 洋葱圈, 奶昔");
        ORDER_CACHE.put(4, "订单: 鸡肉卷, 玉米杯, 冰茶");
        ORDER_CACHE.put(5, "订单: 鱼排汉堡, 薯饼, 咖啡");
    }
    
    // 添加实体查找结果缓存
    private Map<BlockPos, ShopCounterBlockEntity> entityCache = new HashMap<>();
    private long lastCacheUpdate = 0;
    
    // 添加食物评分缓存
    private Map<ItemStack, Integer> foodScoreCache = new HashMap<>();
    private long lastScoreCacheUpdate = 0;
    
    public ShopCounterBlockEntity(BlockPos pos, BlockState state) {
        super(TYPE, pos, state);
    }
    
    public InteractionResult onUse(Player player, InteractionHand hand) {
        ItemStack stack = player.getItemInHand(hand);
        
        // 检查是否是create:filter物品
        Item filterItem = ForgeRegistries.ITEMS.getValue(ResourceLocation.parse("create:filter"));
        if (filterItem != null && stack.getItem() == filterItem) {
            processFilter(stack, player);
            return InteractionResult.SUCCESS;
        }
        
        // 如果玩家拿着剪贴板和羽毛，记录订单
        Item featherItem = ForgeRegistries.ITEMS.getValue(ResourceLocation.parse("minecraft:feather"));
        Item clipboardItem = ForgeRegistries.ITEMS.getValue(ResourceLocation.parse("create:clipboard"));
        if (featherItem != null && stack.getItem() == featherItem) {
            ItemStack offhandItem = player.getOffhandItem();
            if (clipboardItem != null && offhandItem.getItem() == clipboardItem) {
                // 记录订单到剪贴板
                recordOrderToClipboard(player, offhandItem);
                level.playSound(null, worldPosition, SoundEvents.BOOK_PAGE_TURN, SoundSource.BLOCKS, 1.0F, 1.0F);
                return InteractionResult.SUCCESS;
            } else {
                player.sendSystemMessage(Component.translatable("message.shop_core.counter.clipboard"));
                level.playSound(null, worldPosition, SoundEvents.ANVIL_LAND, SoundSource.BLOCKS, 1.0F, 1.0F);
                return InteractionResult.SUCCESS;
            }
        }
        
        // 如果不是过滤器或特殊物品，显示当前商店状态
        if (isShopOpen) {
            player.sendSystemMessage(Component.translatable("message.shop_core.counter.currently_open", menuItems.size()));
        } else {
            player.sendSystemMessage(Component.translatable("message.shop_core.counter.currently_closed"));
        }
        
        return InteractionResult.SUCCESS;
    }
    
    private void recordOrderToClipboard(Player player, ItemStack clipboard) {
        // 查找最近的处于等待记录订单阶段的顾客
        if (level instanceof ServerLevel serverLevel) {
            // 优化：只获取附近的实体而不是所有实体，并使用更精确的搜索范围
            AABB searchBox = new AABB(
                worldPosition.getX() - 4, worldPosition.getY() - 2, worldPosition.getZ() - 4,
                worldPosition.getX() + 4, worldPosition.getY() + 2, worldPosition.getZ() + 4
            );
            
            // 查找附近的顾客实体（使用easy_npc）
            List<Entity> entities = serverLevel.getEntities(null, searchBox);
            Entity targetCustomer = null;
            double closestDistance = Double.MAX_VALUE;
            
            for (Entity entity : entities) {
                // 检查是否是easy_npc并且处于正确的阶段
                if (entity.getType().toString().equals("easy_npc:humanoid") && 
                    entity.getPersistentData().getInt("customerPhase") == 2) {
                    double distance = entity.distanceToSqr(worldPosition.getX(), worldPosition.getY(), worldPosition.getZ());
                    if (distance < closestDistance && distance < 16.0) { // 4格范围内的顾客
                        closestDistance = distance;
                        targetCustomer = entity;
                    }
                }
            }
            
            if (targetCustomer != null) {
                // 获取顾客的订单
                String order = targetCustomer.getPersistentData().getString("customerOrder");
                if (order == null || order.isEmpty()) {
                    // 生成一个随机订单
                    order = generateRandomOrder();
                    targetCustomer.getPersistentData().putString("customerOrder", order);
                }
                
                // 将订单信息写入剪贴板的NBT数据
                CompoundTag clipboardTag = clipboard.getOrCreateTag();
                CompoundTag clipboardData = clipboardTag.getCompound("Clipboard");
                clipboardData.putString("Order", order);
                clipboardTag.put("Clipboard", clipboardData);
                clipboard.setTag(clipboardTag);
                
                player.sendSystemMessage(Component.literal("订单已记录到剪贴板"));
                targetCustomer.getPersistentData().putInt("customerPhase", 3); // 设置为等待交付阶段
            } else {
                player.sendSystemMessage(Component.literal("附近没有等待记录订单的顾客"));
            }
        }
    }
    
    private String generateRandomOrder() {
        if (menuItems.isEmpty()) {
            // 使用预生成的订单模板
            return ORDER_CACHE.getOrDefault(random.nextInt(ORDER_CACHE.size()) + 1, 
                "订单: 汉堡, 薯条, 可乐");
        }
        
        // 简单实现：从菜单中随机选择几项
        StringBuilder order = new StringBuilder("订单: ");
        int itemCount = Math.min(3, menuItems.size());
        int added = 0;
        
        for (String item : menuItems) {
            if (added < itemCount) {
                if (added > 0) order.append(", ");
                order.append("食材").append(added + 1);
                added++;
            }
        }
        
        return order.toString();
    }
    
    private void processFilter(ItemStack filterStack, Player player) {
        if (filterStack.hasTag()) {
            CompoundTag filterTag = filterStack.getTag();
            
            // 检查是否为黑名单模式
            if (filterTag.contains("Blacklist") && filterTag.getInt("Blacklist") == 1) {
                // 关闭店铺
                isShopOpen = false;
                isFirstCustomerSpawned = false;
                menuItems.clear();
                player.sendSystemMessage(Component.translatable("message.shop_core.counter.closed_for_now"));
                level.playSound(null, worldPosition, SoundEvents.PLAYER_LEVELUP, SoundSource.BLOCKS, 1.0F, 1.0F);
                setChanged();
                return;
            }
            
            // 如果店铺已经在营业中，不允许更改菜单
            if (isShopOpen && !menuItems.isEmpty()) {
                player.sendSystemMessage(Component.translatable("message.shop_core.counter.cant_change_menu"));
                level.playSound(null, worldPosition, SoundEvents.ANVIL_LAND, SoundSource.BLOCKS, 1.0F, 1.0F);
                return;
            }
            
            // 处理白名单模式 - 设置菜单
            if (filterTag.contains("Whitelist") && filterTag.getInt("Whitelist") == 1) {
                // 从过滤器中提取物品列表
                if (filterTag.contains("Items", Tag.TAG_LIST)) {
                    ListTag items = filterTag.getList("Items", Tag.TAG_COMPOUND);
                    Set<String> validItems = new HashSet<>();
                    
                    // 检查每个物品是否有效（在配置文件中定义）
                    for (int i = 0; i < items.size(); i++) {
                        CompoundTag itemTag = items.getCompound(i);
                        if (itemTag.contains("id", Tag.TAG_STRING)) {
                            String itemId = itemTag.getString("id");
                            
                            // 检查物品是否在配置文件中定义的有效物品列表中
                            if (ShopConfigManager.getInstance().isMealItem(itemId)) {
                                validItems.add(itemId);
                            }
                        }
                    }
                    
                    // 检查有效物品数量是否满足要求（至少3个）
                    if (validItems.size() >= 3) {
                        // 清空当前菜单并设置新菜单
                        menuItems.clear();
                        menuItems.addAll(validItems);
                        // 开启店铺
                        isShopOpen = true;
                        isFirstCustomerSpawned = false; // 重置顾客生成状态
                        player.sendSystemMessage(Component.translatable("message.shop_core.counter.set_menu"));
                        level.playSound(null, worldPosition, SoundEvents.PLAYER_LEVELUP, SoundSource.BLOCKS, 1.0F, 1.0F);
                        setChanged();
                        return;
                    } else {
                        // 有效物品不足3个
                        player.sendSystemMessage(Component.translatable("message.shop_core.counter.insufficient_valid_items", validItems.size()));
                        level.playSound(null, worldPosition, SoundEvents.ANVIL_LAND, SoundSource.BLOCKS, 1.0F, 1.0F);
                        return;
                    }
                } else {
                    // 过滤器中没有物品
                    player.sendSystemMessage(Component.translatable("message.shop_core.counter.empty_filter"));
                    level.playSound(null, worldPosition, SoundEvents.ANVIL_LAND, SoundSource.BLOCKS, 1.0F, 1.0F);
                    return;
                }
            }
        }
        // 其他情况不处理（不提示无效过滤器）
    }
    
    public static void serverTick(Level level, BlockPos pos, BlockState state, ShopCounterBlockEntity entity) {
        // 每tick执行的逻辑
        if (!level.isClientSide) {
            // 只有在店铺营业时才执行任何逻辑
            if (entity.isShopOpen) {
                entity.customerSpawnTimer++;
                
                // 检查是否需要生成第一个顾客
                if (!entity.isFirstCustomerSpawned && level instanceof ServerLevel serverLevel) {
                    // 确保在白天时段生成第一个顾客
                    long dayTime = level.getDayTime() % 24000;
                    if (dayTime < 12000) {
                        entity.spawnCustomer(serverLevel);
                        entity.isFirstCustomerSpawned = true;
                    }
                }
                
                // 每200 tick尝试生成一个顾客（约10秒）
                if (entity.customerSpawnTimer >= 200) {
                    entity.customerSpawnTimer = 0;
                    
                    // 只有在店铺营业时才生成顾客
                    if (level instanceof ServerLevel serverLevel) {
                        // 在白天时段（Minecraft一天24000tick，0-12000为白天）
                        long dayTime = level.getDayTime() % 24000;
                        if (dayTime < 12000) {
                            // 提高生成概率到30%
                            if (entity.random.nextFloat() < 0.3f) {
                                entity.spawnCustomer(serverLevel);
                            }
                        }
                    }
                }
                
                // 查找附近的顾客并处理交付
                // 优化：每40 ticks执行一次
                if (entity.customerSpawnTimer % 40 == 0) {
                    entity.handleFoodDelivery();
                }
            }
            // 如果店铺未营业，则不执行任何操作，直接返回
        }
    }
    
    private void handleFoodDelivery() {
        if (!(level instanceof ServerLevel serverLevel)) return;
        
        // 进一步优化：增加更长的处理间隔并缩小搜索范围
        // 只有每40 ticks（2秒）才处理一次交付，而不是每20 ticks
        if (customerSpawnTimer % 40 != 0) {
            return;
        }
        
        // 进一步缩小搜索范围以减少实体查找开销
        AABB searchBox = new AABB(
            worldPosition.getX() - 1.0, worldPosition.getY(), worldPosition.getZ() - 1.0,
            worldPosition.getX() + 1.0, worldPosition.getY() + 2, worldPosition.getZ() + 1.0
        );
        
        // 查找附近的顾客实体（使用easy_npc）
        List<Entity> entities = serverLevel.getEntities(null, searchBox);
        for (Entity customer : entities) {
            // 检查是否是easy_npc并且处于等待交付阶段
            if (customer.getType().toString().equals("easy_npc:humanoid") && 
                customer.getPersistentData().getInt("customerPhase") == 3) {
                
                // 检查附近是否有玩家手持食物
                List<Player> players = serverLevel.getEntitiesOfClass(Player.class, searchBox);
                boolean foodDelivered = false;
                
                for (Player player : players) {
                    ItemStack heldItem = player.getMainHandItem();
                    if (!heldItem.isEmpty()) {
                        // 验证食物是否符合订单要求
                        String order = customer.getPersistentData().getString("customerOrder");
                        boolean foodMatchesOrder = validateFoodAgainstOrder(heldItem, order);
                        
                        // 获取食物评分
                        int foodScore = getFoodScore(heldItem);
                        
                        // 给予玩家报酬
                        givePlayerReward(player, foodScore, foodMatchesOrder);
                        
                        // 完成交付
                        customer.getPersistentData().putInt("customerPhase", 4); // 设置为离场阶段
                        customer.getPersistentData().putDouble("customerMoveDirection", -1.0); // 设置移动方向为离场
                        
                        // 消耗食物
                        heldItem.shrink(1);
                        foodDelivered = true;
                        break;
                    }
                }
                
                // 如果没有合适的食品被交付，可以添加一些反馈
                if (!foodDelivered) {
                    // 可以添加一些提示信息，告诉玩家需要提供正确的食物
                }
            }
        }
    }

    /**
     * 验证食物是否符合订单要求
     * @param food 食物物品
     * @param order 订单内容
     * @return 是否符合要求
     */
    private boolean validateFoodAgainstOrder(ItemStack food, String order) {
        // 这里应该实现具体的验证逻辑
        // 根据订单内容检查食物是否正确
        // 简化实现：检查食物是否是我们系统中的食物
        return food.hasTag() && food.getTag().contains("FoodScore");
    }

    /**
     * 获取食物评分
     * @param food 食物物品
     * @return 食物评分
     */
    private int getFoodScore(ItemStack food) {
        // 检查缓存是否过期（每20秒清除一次缓存）
        long currentTime = System.currentTimeMillis();
        if (currentTime - lastScoreCacheUpdate > 20000) {
            foodScoreCache.clear();
            lastScoreCacheUpdate = currentTime;
        }
        
        // 检查缓存中是否存在该食物的评分
        if (foodScoreCache.containsKey(food)) {
            return foodScoreCache.get(food);
        }
        
        int score;
        if (food.hasTag() && food.getTag().contains("FoodScore")) {
            score = food.getTag().getInt("FoodScore");
        } else {
            score = 50; // 默认评分
        }
        
        // 将评分存入缓存
        foodScoreCache.put(food, score);
        return score;
    }

    /**
     * 根据食物评分和是否匹配订单给予玩家报酬
     * @param player 玩家
     * @param foodScore 食物评分
     * @param matchesOrder 是否匹配订单
     */
    private void givePlayerReward(Player player, int foodScore, boolean matchesOrder) {
        // 这里应该根据食物质量和订单完成情况给予玩家报酬
        // 与KubeJS经济系统集成

        // 示例奖励计算（实际应该根据订单内容和食物评分计算）
        int baseReward = 10; // 基础奖励
        
        // 获取玩家手持物品的基础价格
        ItemStack heldItem = player.getMainHandItem();
        if (!heldItem.isEmpty()) {
            baseReward = FoodQualityUtil.getBasePrice(heldItem);
            if (baseReward <= 0) {
                baseReward = 10; // 默认基础奖励
            }
        }
        
        // 根据评分计算最终奖励
        int reward = FoodQualityUtil.calculateFinalPrice(baseReward, foodScore);
        
        // 如果食物不匹配订单，只给一半的钱
        if (!matchesOrder) {
            reward = Math.max(1, reward / 2);
        }
        
        // 通过命令给予玩家 kubejs:copper_gt_credit
        if (player.getServer() != null) {
            player.getServer().getCommands().performPrefixedCommand(
                player.createCommandSourceStack(), 
                "execute as " + player.getUUID() + " run give @s kubejs:copper_gt_credit " + reward
            );
        }
    }
    
    private void spawnCustomer(ServerLevel serverLevel) {
        // 进一步优化：更严格的顾客数量限制
        AABB searchBox = new AABB(
            worldPosition.getX() - 5, worldPosition.getY() - 2, worldPosition.getZ() - 5,
            worldPosition.getX() + 15, worldPosition.getY() + 2, worldPosition.getZ() + 5
        );
        
        // 计算附近的顾客数量
        List<Entity> nearbyEntities = serverLevel.getEntities(null, searchBox);
        int customerCount = 0;
        for (Entity entity : nearbyEntities) {
            if (entity.getType().toString().equals("easy_npc:humanoid")) {
                customerCount++;
            }
        }
        
        // 如果附近已经有超过5个顾客，就不再生成新的顾客（增加到5个）
        if (customerCount >= 5) {
            return;
        }
        
        // 使用easy_npc系统创建顾客
        // 首先尝试从Forge注册表获取实体类型
        ResourceLocation entityLocation = ResourceLocation.parse("easy_npc:humanoid");
        EntityType<?> entityType = ForgeRegistries.ENTITY_TYPES.getValue(entityLocation);
        if (entityType != null) {
            Entity customer = entityType.create(serverLevel);
            if (customer != null) {
                // 在柜台前方生成顾客
                double spawnX = worldPosition.getX() + 8.0; // 柜台同一X位置，但偏移一些
                double spawnY = worldPosition.getY();
                double spawnZ = worldPosition.getZ() + 1.5; // 柜台前方
                
                customer.setPos(spawnX, spawnY, spawnZ);
                customer.getPersistentData().putString("customerOrder", generateRandomOrder()); // 生成随机订单
                customer.getPersistentData().putInt("customerPhase", 1); // 设置为进场阶段
                customer.getPersistentData().putDouble("customerMoveDirection", 0.0); // 设置移动方向为向柜台移动
                
                // 设置顾客的AI为启用状态
                customer.getPersistentData().putBoolean("NoAI", false);
                
                serverLevel.addFreshEntity(customer);
                
                // 添加粒子效果
                serverLevel.sendParticles(
                    ParticleTypes.POOF,
                    spawnX, spawnY + 1, spawnZ,
                    50, 0.5, 1, 0.5, 0
                );
            }
        }
    }

    @Override
    public void load(CompoundTag tag) {
        super.load(tag);
        isShopOpen = tag.getBoolean("IsShopOpen");
        
        if (tag.contains("MenuItems", Tag.TAG_LIST)) {
            ListTag menuList = tag.getList("MenuItems", Tag.TAG_STRING);
            menuItems.clear();
            for (int i = 0; i < menuList.size(); i++) {
                menuItems.add(menuList.getString(i));
            }
        }
        
        if (tag.contains("IsFirstCustomerSpawned")) {
            isFirstCustomerSpawned = tag.getBoolean("IsFirstCustomerSpawned");
        }
    }
    
    @Override
    protected void saveAdditional(CompoundTag tag) {
        super.saveAdditional(tag);
        tag.putBoolean("IsShopOpen", isShopOpen);
        tag.putBoolean("IsFirstCustomerSpawned", isFirstCustomerSpawned);
        
        ListTag menuList = new ListTag();
        for (String item : menuItems) {
            menuList.add(net.minecraft.nbt.StringTag.valueOf(item));
        }
        tag.put("MenuItems", menuList);
    }
    
    public Set<String> getMenuItems() {
        return menuItems;
    }
    
    public boolean isShopOpen() {
        return isShopOpen;
    }
}
package org.tab.shop_core.block.entity;

import net.minecraft.core.BlockPos;
import net.minecraft.nbt.CompoundTag;
import net.minecraft.nbt.ListTag;
import net.minecraft.network.protocol.game.ClientboundBlockEntityDataPacket;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.level.block.entity.BlockEntity;
import net.minecraft.world.level.block.entity.BlockEntityType;
import net.minecraft.world.level.block.state.BlockState;
import net.minecraft.core.NonNullList;
import net.minecraftforge.registries.ForgeRegistries;
import org.tab.shop_core.Shop_core;
import org.tab.shop_core.util.FoodQualityUtil;

public class CuisineSkilletBlockEntity extends BlockEntity {
    public static final BlockEntityType<CuisineSkilletBlockEntity> TYPE = BlockEntityType.Builder.of(
            CuisineSkilletBlockEntity::new, 
            ForgeRegistries.BLOCKS.getValue(ResourceLocation.fromNamespaceAndPath("cuisinedelight", "cuisine_skillet"))
    ).build(null);
    
    // 存储放入的食材
    private final NonNullList<ItemStack> ingredients = NonNullList.withSize(10, ItemStack.EMPTY);
    
    // 烹饪相关数据
    private int cookingTime = 0; // 烹饪时间（tick）
    private int stirCount = 0;   // 翻炒次数
    private boolean isBurnt = false; // 是否烧焦
    
    public CuisineSkilletBlockEntity(BlockPos pos, BlockState state) {
        super(TYPE, pos, state);
    }
    
    public CuisineSkilletBlockEntity(BlockEntityType<?> type, BlockPos pos, BlockState state) {
        super(type, pos, state);
    }
    
    // 添加食材
    public void addIngredient(ItemStack stack) {
        for (int i = 0; i < ingredients.size(); i++) {
            if (ingredients.get(i).isEmpty()) {
                ingredients.set(i, stack.copy());
                stack.setCount(0);
                setChanged();
                return;
            }
        }
    }
    
    // 翻炒
    public void stir() {
        if (!ingredients.isEmpty()) {
            stirCount++;
            setChanged();
        }
    }
    
    // 更新烹饪时间
    public void updateCookingTime(int ticks) {
        cookingTime += ticks;
        
        // 检查是否烧焦（烹饪时间过长）
        if (cookingTime > 600) { // 30秒后可能烧焦
            isBurnt = true;
        }
        
        setChanged();
    }
    
    // 完成烹饪并生成食物
    public ItemStack finishCooking() {
        if (ingredients.isEmpty()) {
            return ItemStack.EMPTY;
        }
        
        // 创建食物物品（这里创建一个示例食物，实际应该根据配方创建）
        ItemStack food = new ItemStack(ForgeRegistries.ITEMS.getValue(ResourceLocation.fromNamespaceAndPath(Shop_core.MODID, "cooked_food")));
        if (food.isEmpty()) {
            // 如果没有自定义食物，创建一个默认的食物
            food = new ItemStack(net.minecraft.world.item.Items.BREAD);
        }
        
        // 将食材信息存储到食物中
        storeIngredientsInfo(food);
        
        // 计算评分
        long ingredientCount = ingredients.stream().filter(stack -> !stack.isEmpty()).count();
        int score = FoodQualityUtil.calculateFoodScore(
            (int) ingredientCount, // 食材种类数量
            cookingTime,  // 烹饪时间
            stirCount,    // 翻炒次数
            isBurnt       // 是否烧焦
        );
        
        // 将评分存储到食物中
        FoodQualityUtil.setFoodScore(food, score);
        
        // 重置烹饪数据
        resetCooking();
        
        return food;
    }
    
    // 将食材信息存储到食物中
    private void storeIngredientsInfo(ItemStack food) {
        CompoundTag foodTag = food.getOrCreateTag();
        ListTag ingredientsTag = new ListTag();
        
        for (ItemStack ingredient : ingredients) {
            if (!ingredient.isEmpty()) {
                ingredientsTag.add(ingredient.save(new CompoundTag()));
            }
        }
        
        foodTag.put("Ingredients", ingredientsTag);
    }
    
    // 重置烹饪数据
    private void resetCooking() {
        for (int i = 0; i < ingredients.size(); i++) {
            ingredients.set(i, ItemStack.EMPTY);
        }
        cookingTime = 0;
        stirCount = 0;
        isBurnt = false;
        setChanged();
    }
    
    @Override
    public void load(CompoundTag tag) {
        super.load(tag);
        // 加载食材
        ListTag ingredientsTag = tag.getList("Ingredients", 10); // 10表示CompoundTag
        for (int i = 0; i < ingredientsTag.size(); i++) {
            if (i < ingredients.size()) {
                ingredients.set(i, ItemStack.of(ingredientsTag.getCompound(i)));
            }
        }
        
        cookingTime = tag.getInt("CookingTime");
        stirCount = tag.getInt("StirCount");
        isBurnt = tag.getBoolean("IsBurnt");
    }
    
    @Override
    protected void saveAdditional(CompoundTag tag) {
        super.saveAdditional(tag);
        // 保存食材
        ListTag ingredientsTag = new ListTag();
        for (ItemStack stack : ingredients) {
            if (!stack.isEmpty()) {
                ingredientsTag.add(stack.save(new CompoundTag()));
            }
        }
        tag.put("Ingredients", ingredientsTag);
        
        tag.putInt("CookingTime", cookingTime);
        tag.putInt("StirCount", stirCount);
        tag.putBoolean("IsBurnt", isBurnt);
    }
    
    @Override
    public CompoundTag getUpdateTag() {
        CompoundTag tag = super.getUpdateTag();
        saveAdditional(tag);
        return tag;
    }
    
    @Override
    public ClientboundBlockEntityDataPacket getUpdatePacket() {
        return ClientboundBlockEntityDataPacket.create(this);
    }
}
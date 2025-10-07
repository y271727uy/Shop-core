package org.tab.shop_core.client.event;

import net.minecraft.ChatFormatting;
import net.minecraft.network.chat.Component;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.world.item.ItemStack;
import net.minecraftforge.api.distmarker.Dist;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.event.entity.player.ItemTooltipEvent;
import org.tab.shop_core.config.ShopConfigManager;

import java.util.HashMap;
import java.util.Map;

public class ShopCoreClientEvents {
    
    // 创建数字映射，将英文数字映射到对应的数值
    private static final Map<String, Integer> NUMBER_MAP = new HashMap<>();
    static {
        NUMBER_MAP.put("one", 1);
        NUMBER_MAP.put("two", 2);
        NUMBER_MAP.put("three", 3);
        NUMBER_MAP.put("four", 4);
        NUMBER_MAP.put("five", 5);
        NUMBER_MAP.put("six", 6);
        NUMBER_MAP.put("seven", 7);
        NUMBER_MAP.put("eight", 8);
        NUMBER_MAP.put("nine", 9);
        NUMBER_MAP.put("ten", 10);
    }
    
    // 调料价格映射
    private static final Map<String, Double> SPICE_PRICE_MAP = new HashMap<>();
    static {
        SPICE_PRICE_MAP.put("spice_one", 0.01);
        SPICE_PRICE_MAP.put("spice_two", 0.02);
        SPICE_PRICE_MAP.put("spice_three", 0.03);
    }
    
    @SubscribeEvent
    public static void onItemTooltip(ItemTooltipEvent event) {
        ItemStack stack = event.getItemStack();
        if (!stack.isEmpty()) {
            // 获取物品的ID
            ResourceLocation itemId = net.minecraftforge.registries.ForgeRegistries.ITEMS.getKey(stack.getItem());
            if (itemId != null) {
                String itemIdStr = itemId.toString();
                
                // 检查是否是调味料
                ShopConfigManager configManager = ShopConfigManager.getInstance();
                int seasoningLevel = configManager.getSeasoningLevel(itemIdStr);
                
                // 如果是调味料，添加提示信息
                if (seasoningLevel > 0) {
                    // 根据记忆中的规范，添加价格加成提示
                    event.getToolTip().add(Component.literal("小食坊价格加成：" + seasoningLevel + "%").withStyle(ChatFormatting.GREEN));
                }
                
                // 检查是否是number物品
                int numberLevel = configManager.getNumberLevel(itemIdStr);
                
                // 如果是number物品，显示对应的价格
                if (numberLevel > 0) {
                    event.getToolTip().add(Component.literal("小食坊基础价格：" + numberLevel).withStyle(ChatFormatting.GREEN));
                }
            }
            
            // 检查食物品质评分
            if (stack.hasTag() && stack.getTag().contains("FoodScore")) {
                int foodScore = stack.getTag().getInt("FoodScore");
                if (foodScore > 95) {
                    event.getToolTip().add(Component.literal("§e满分!!"));
                } else if (foodScore >= 70) {
                    event.getToolTip().add(Component.literal("§a优秀!"));
                } else {
                    event.getToolTip().add(Component.literal("§c不合格!!"));
                }
            }
        }
    }
}
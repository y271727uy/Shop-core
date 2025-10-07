package org.tab.shop_core.util;

import net.minecraft.nbt.CompoundTag;
import net.minecraft.network.chat.Component;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.world.item.ItemStack;
import net.minecraftforge.registries.ForgeRegistries;
import org.tab.shop_core.config.ShopConfigManager;

public class FoodQualityUtil {
    
    /**
     * 根据评分显示不同的提示信息
     * @param score 评分
     * @return 提示信息组件
     */
    public static Component getQualityMessage(int score) {
        if (score > 95) {
            return Component.literal("§e满分!!"); // 金色
        } else if (score >= 70) {
            return Component.literal("§a优秀!"); // 绿色
        } else {
            return Component.literal("§c不合格!!"); // 红色
        }
    }
    
    /**
     * 根据评分计算最终价格
     * @param basePrice 基础价格
     * @param score 评分
     * @return 最终价格
     */
    public static int calculateFinalPrice(int basePrice, int score) {
        if (score > 95) {
            // 满分是基础价格 + 基础价格*0.5 = 基础价格*1.5
            return (int) (basePrice * 1.5);
        } else if (score >= 70) {
            // 中等分数是直接给予玩家基础价格
            return basePrice;
        } else {
            // 不合格是基础价格-5
            return Math.max(0, basePrice - 5);
        }
    }
    
    /**
     * 将评分存储到物品的NBT数据中
     * @param stack 物品堆
     * @param score 评分
     */
    public static void setFoodScore(ItemStack stack, int score) {
        CompoundTag tag = stack.getOrCreateTag();
        tag.putInt("FoodScore", score);
    }
    
    /**
     * 从物品的NBT数据中获取评分
     * @param stack 物品堆
     * @return 评分，如果不存在则返回-1
     */
    public static int getFoodScore(ItemStack stack) {
        if (stack.hasTag() && stack.getTag().contains("FoodScore")) {
            return stack.getTag().getInt("FoodScore");
        }
        return -1; // 未评分
    }
    
    /**
     * 获取物品的基础价格
     * @param stack 物品堆
     * @return 基础价格
     */
    public static int getBasePrice(ItemStack stack) {
        // 获取物品的ID
        ResourceLocation itemId = ForgeRegistries.ITEMS.getKey(stack.getItem());
        if (itemId != null) {
            String itemIdStr = itemId.toString();
            
            // 检查是否是number物品
            ShopConfigManager configManager = ShopConfigManager.getInstance();
            int numberLevel = configManager.getNumberLevel(itemIdStr);
            
            // 如果是number物品，返回对应的价格
            if (numberLevel > 0) {
                return numberLevel;
            }
        }
        
        // 默认价格为0
        return 0;
    }
    
    /**
     * 计算食物评分（模拟平底锅侠的评分系统）
     * @param ingredientsCount 食材种类数量
     * @param cookingTime 烹饪时间（tick）
     * @param stirCount 翻炒次数
     * @param isBurnt 是否烧焦
     * @return 计算出的评分
     */
    public static int calculateFoodScore(int ingredientsCount, int cookingTime, int stirCount, boolean isBurnt) {
        // 基础分为50分
        int score = 50;
        
        // 食材种类加成（每种食材+5分）
        score += ingredientsCount * 5;
        
        // 烹饪时间影响（理想时间范围内+10分，过短或过长会扣分）
        if (cookingTime >= 100 && cookingTime <= 300) {
            score += 10;
        } else if (cookingTime < 50 || cookingTime > 500) {
            score -= 10;
        }
        
        // 翻炒次数影响（适当翻炒+5分，不翻炒或过度翻炒扣分）
        if (stirCount >= 1 && stirCount <= 3) {
            score += 5;
        } else if (stirCount == 0 || stirCount > 5) {
            score -= 5;
        }
        
        // 烧焦惩罚（烧焦直接扣20分）
        if (isBurnt) {
            score -= 20;
        }
        
        // 确保评分在0-100范围内
        return Math.max(0, Math.min(100, score));
    }
}
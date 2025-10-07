package org.tab.shop_core.item;

import net.minecraft.network.chat.Component;
import net.minecraft.world.entity.player.Player;
import net.minecraft.world.item.Item;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.item.TooltipFlag;
import net.minecraft.world.level.Level;
import net.minecraft.world.InteractionResult;
import net.minecraft.world.InteractionHand;
import net.minecraft.world.entity.LivingEntity;
import org.jetbrains.annotations.Nullable;
import org.tab.shop_core.util.FoodQualityUtil;

import java.util.List;

public class CookedFoodItem extends Item {
    private final int basePrice;

    public CookedFoodItem(Properties properties, int basePrice) {
        super(properties);
        this.basePrice = basePrice;
    }

    @Override
    public void appendHoverText(ItemStack stack, @Nullable Level level, List<Component> tooltipComponents, TooltipFlag isAdvanced) {
        super.appendHoverText(stack, level, tooltipComponents, isAdvanced);
        
        // 显示基础价格
        tooltipComponents.add(Component.literal("基础价格: " + basePrice));
        
        // 获取并显示评分信息
        int score = FoodQualityUtil.getFoodScore(stack);
        if (score >= 0) {
            tooltipComponents.add(FoodQualityUtil.getQualityMessage(score));
            
            // 显示预计收益
            int finalPrice = FoodQualityUtil.calculateFinalPrice(basePrice, score);
            tooltipComponents.add(Component.literal("预计收益: " + finalPrice));
        } else {
            tooltipComponents.add(Component.literal("尚未烹饪完成"));
        }
    }

    @Override
    public ItemStack finishUsingItem(ItemStack stack, Level level, LivingEntity livingEntity) {
        if (livingEntity instanceof Player player) {
            // 获取食物评分
            int score = FoodQualityUtil.getFoodScore(stack);
            if (score >= 0) {
                // 根据评分计算最终价格并给予玩家
                int finalPrice = FoodQualityUtil.calculateFinalPrice(basePrice, score);
                
                // 这里应该添加将价格给予玩家的逻辑
                // 例如：player.getInventory().add(new ItemStack(Items.EMERALD, finalPrice));
                
                // 显示评分信息
                player.displayClientMessage(FoodQualityUtil.getQualityMessage(score), true);
            }
        }
        return super.finishUsingItem(stack, level, livingEntity);
    }
}
package com.p1nero.smc.item;

import com.p1nero.smc.SkilletManCoreMod;
import com.p1nero.smc.block.SMCBlocks;
import com.p1nero.smc.item.SMCItems;
import com.p1nero.smc.registrate.SMCRegistrateBlocks;
import com.p1nero.smc.registrate.SMCRegistrateItems;
import dev.xkmc.cuisinedelight.init.registrate.CDItems;
import net.minecraft.core.registries.Registries;
import net.minecraft.network.chat.Component;
import net.minecraft.resources.ResourceKey;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.world.item.CreativeModeTab;
import net.minecraft.world.item.CreativeModeTabs;
import net.minecraft.world.item.Item;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.item.Items;
import net.minecraft.world.level.ItemLike;
import net.minecraftforge.registries.DeferredRegister;
import net.minecraftforge.registries.RegistryObject;
import yesman.epicfight.world.item.EpicFightItems;

import java.util.function.Supplier;

public class SMCItemTabs {
    public static final DeferredRegister<CreativeModeTab> REGISTRY = DeferredRegister.create(Registries.CREATIVE_MODE_TAB, SkilletManCoreMod.MOD_ID);

    public static final RegistryObject<CreativeModeTab> ITEMS = REGISTRY.register("items",
        () -> CreativeModeTab.builder()
            .title(Component.translatable("itemGroup.smc.items"))
            .icon(() -> new ItemStack(SMCRegistrateItems.DIAMOND_SPATULA_V5.get()))
            .withTabsBefore(CDItems.TAB.getKey())
            .displayItems(new CreativeModeTab.DisplayItemsGenerator() {
                @Override
                public void accept(CreativeModeTab.ItemDisplayParameters parameters, CreativeModeTab.Output output) {
                    // 基础方块
                    output.accept(SMCBlocks.MAIN_COOK_BLOCK.get());
                    output.accept(SMCRegistrateBlocks.MAIN_COOK_BLOCK2.get().asItem().getDefaultInstance());
                    output.accept(SMCRegistrateItems.END_TELEPORTER.get());
                    output.accept(SMCItems.LEFT_SKILLET_RIGHT_SPATULA.get());
                    
                    // 指南书
                    output.accept(SMCRegistrateItems.COOK_GUIDE_BOOK_ITEM.get());
                    output.accept(SMCRegistrateItems.CREATE_COOK_GUIDE_BOOK_ITEM.get());
                    output.accept(SMCRegistrateItems.CREATE_FUEL_GUIDE_BOOK.get());
                    output.accept(SMCRegistrateItems.EPIC_FIGHT_GUIDE_BOOK.get());

                    // 平底锅系列
                    acceptItem(output, SMCRegistrateItems.IRON_SKILLET_LEVEL2);
                    acceptItem(output, SMCRegistrateItems.IRON_SKILLET_LEVEL3);
                    acceptItem(output, SMCRegistrateItems.IRON_SKILLET_LEVEL4);
                    acceptItem(output, SMCRegistrateItems.IRON_SKILLET_LEVEL5);
                    acceptItem(output, SMCRegistrateItems.GOLDEN_SKILLET);
                    acceptItem(output, SMCRegistrateItems.GOLDEN_SKILLET_V2);
                    acceptItem(output, SMCRegistrateItems.GOLDEN_SKILLET_V3);
                    acceptItem(output, SMCRegistrateItems.GOLDEN_SKILLET_V4);
                    acceptItem(output, SMCRegistrateItems.GOLDEN_SKILLET_V5);
                    acceptItem(output, SMCRegistrateItems.DIAMOND_SKILLET);
                    acceptItem(output, SMCRegistrateItems.DIAMOND_SKILLET_V2);
                    acceptItem(output, SMCRegistrateItems.DIAMOND_SKILLET_V3);
                    acceptItem(output, SMCRegistrateItems.DIAMOND_SKILLET_V4);
                    acceptItem(output, SMCRegistrateItems.DIAMOND_SKILLET_V5);

                    // 锅铲系列
                    acceptItem(output, SMCRegistrateItems.SPATULA_V2);
                    acceptItem(output, SMCRegistrateItems.SPATULA_V3);
                    acceptItem(output, SMCRegistrateItems.SPATULA_V4);
                    acceptItem(output, SMCRegistrateItems.SPATULA_V5);
                    acceptItem(output, SMCRegistrateItems.GOLDEN_SPATULA);
                    acceptItem(output, SMCRegistrateItems.GOLDEN_SPATULA_V2);
                    acceptItem(output, SMCRegistrateItems.GOLDEN_SPATULA_V3);
                    acceptItem(output, SMCRegistrateItems.GOLDEN_SPATULA_V4);
                    acceptItem(output, SMCRegistrateItems.GOLDEN_SPATULA_V5);
                    acceptItem(output, SMCRegistrateItems.DIAMOND_SPATULA);
                    acceptItem(output, SMCRegistrateItems.DIAMOND_SPATULA_V2);
                    acceptItem(output, SMCRegistrateItems.DIAMOND_SPATULA_V3);
                    acceptItem(output, SMCRegistrateItems.DIAMOND_SPATULA_V4);
                    acceptItem(output, SMCRegistrateItems.DIAMOND_SPATULA_V5);

                    // 抽奖券系列
                    acceptItem(output, SMCRegistrateItems.WEAPON_RAFFLE_TICKET);
                    acceptItem(output, SMCRegistrateItems.ARMOR_RAFFLE_TICKET);
                    acceptItem(output, SMCRegistrateItems.SKILL_BOOK_RAFFLE_TICKET);
                    acceptItem(output, SMCRegistrateItems.DISC_RAFFLE_TICKET);
                    acceptItem(output, SMCRegistrateItems.PET_RAFFLE_TICKET);
                    
                    // 生怪蛋
                    acceptItem(output, SMCItems.NO_BRAIN_VILLAGER_SPAWN_EGG);
                    acceptItem(output, SMCItems.GOOD_SUPER_GOLEM_SPAWN_EGG);

                    // 其他物品
                    acceptItem(output, SMCRegistrateItems.RUMOR_ITEM);
                    acceptItem(output, SMCRegistrateItems.LUCKY_CAT);
                    acceptItem(output, SMCRegistrateItems.BAD_CAT);
                    acceptItem(output, SMCRegistrateItems.GUO_CHAO);
                    acceptItem(output, SMCRegistrateItems.SUPER_CHEF_PILL);
                    acceptItem(output, SMCRegistrateItems.PI_SHUANG);

                    // 特殊蜂蜜物品
                    ItemStack honeyHoney = new ItemStack(Items.HONEY_BOTTLE);
                    honeyHoney.getOrCreateTag().putBoolean(SkilletManCoreMod.MUL, true);
                    honeyHoney.setHoverName(SkilletManCoreMod.getInfo("honey_custom_name"));
                    output.accept(honeyHoney);
                }
                
                private void acceptItem(CreativeModeTab.Output output, Supplier<? extends ItemLike> itemSupplier) {
                    output.accept(itemSupplier.get());
                }
                
                private void acceptItem(CreativeModeTab.Output output, RegistryObject<? extends ItemLike> item) {
                    output.accept(item.get());
                }
            })
            .build());
}
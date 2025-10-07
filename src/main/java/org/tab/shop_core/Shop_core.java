package org.tab.shop_core;

import com.mojang.logging.LogUtils;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.world.entity.EntityType;
import net.minecraft.world.entity.MobCategory;
import net.minecraft.world.item.BlockItem;
import net.minecraft.world.item.CreativeModeTabs;
import net.minecraft.world.item.Item;
import net.minecraft.world.level.block.Block;
import net.minecraft.world.level.block.SoundType;
import net.minecraft.world.level.block.entity.BlockEntityType;
import net.minecraft.world.level.material.MapColor;
import net.minecraftforge.common.MinecraftForge;
import net.minecraftforge.event.BuildCreativeModeTabContentsEvent;
import net.minecraftforge.event.entity.EntityAttributeCreationEvent;
import net.minecraftforge.event.server.ServerStartingEvent;
import net.minecraftforge.eventbus.api.IEventBus;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.event.lifecycle.FMLClientSetupEvent;
import net.minecraftforge.fml.event.lifecycle.FMLCommonSetupEvent;
import net.minecraftforge.fml.javafmlmod.FMLJavaModLoadingContext;
import net.minecraftforge.registries.DeferredRegister;
import net.minecraftforge.registries.ForgeRegistries;
import net.minecraftforge.registries.RegistryObject;
import org.slf4j.Logger;
import org.tab.shop_core.block.ShopCounterBlock;
import org.tab.shop_core.block.entity.CuisineSkilletBlockEntity;
import org.tab.shop_core.block.entity.ShopCounterBlockEntity;
import net.minecraftforge.fml.config.ModConfig;
import org.tab.shop_core.config.ShopConfigManager;

@Mod(Shop_core.MODID)
public class Shop_core
{
    public static final String MODID = "shop_core";
    private static final Logger LOGGER = LogUtils.getLogger();
    
    // 方块注册
    public static final DeferredRegister<Block> SHOP_BLOCKS = DeferredRegister.create(ForgeRegistries.BLOCKS, MODID);
    public static final RegistryObject<ShopCounterBlock> SHOP_COUNTER = SHOP_BLOCKS.register("shop_counter", 
        () -> new ShopCounterBlock(Block.Properties.of().mapColor(MapColor.WOOD).sound(SoundType.WOOD).strength(2.0F)));
    
    // 物品注册
    public static final DeferredRegister<Item> SHOP_ITEMS = DeferredRegister.create(ForgeRegistries.ITEMS, MODID);
    public static final RegistryObject<Item> SHOP_COUNTER_ITEM = SHOP_ITEMS.register("shop_counter", 
        () -> new BlockItem(SHOP_COUNTER.get(), new Item.Properties()));

    public Shop_core() {
        IEventBus modEventBus = FMLJavaModLoadingContext.get().getModEventBus();
        SHOP_BLOCKS.register(modEventBus);
        SHOP_ITEMS.register(modEventBus);

        // 初始化配置管理器
        modEventBus.addListener(this::setup);
        
        // 注册Creative Tab
        modEventBus.addListener(this::addCreative);
        
        MinecraftForge.EVENT_BUS.register(this);
    }

    private void setup(final FMLCommonSetupEvent event) {
        // 初始化配置管理器
        ShopConfigManager.getInstance();
    }
    
    private void addCreative(BuildCreativeModeTabContentsEvent event) {
        if (event.getTabKey() == CreativeModeTabs.FUNCTIONAL_BLOCKS) {
            event.accept(SHOP_COUNTER_ITEM.get());
        }
    }

    @SubscribeEvent
    public void onServerStarting(ServerStartingEvent event) {
        LOGGER.info("HELLO from server starting");
    }
    
    @Mod.EventBusSubscriber(modid = MODID, bus = Mod.EventBusSubscriber.Bus.MOD)
    public static class ClientModEvents {
        @SubscribeEvent
        public static void onClientSetup(FMLClientSetupEvent event) {
            LOGGER.info("HELLO FROM CLIENT SETUP");
        }
    }
    
    public static ResourceLocation prefix(String path) {
        return ResourceLocation.fromNamespaceAndPath(MODID, path);
    }
}
package org.tab.shop_core;

import net.minecraft.resources.ResourceLocation;
import net.minecraft.world.item.Item;
import net.minecraftforge.common.ForgeConfigSpec;
import net.minecraftforge.registries.ForgeRegistries;
import org.apache.commons.lang3.tuple.Pair;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class Config {
    public static final ForgeConfigSpec SPEC;
    public static final ForgeConfigSpec.ConfigValue<Boolean> logDirtBlock;
    public static final ForgeConfigSpec.ConfigValue<Integer> magicNumber;
    public static final ForgeConfigSpec.ConfigValue<String> magicNumberIntroduction;
    public static final ForgeConfigSpec.ConfigValue<List<? extends String>> ITEM_STRINGS;
    public static Set<Item> items;

    static {
        ForgeConfigSpec.Builder builder = new ForgeConfigSpec.Builder();
        builder.comment("General configuration settings").push("general");
        logDirtBlock = builder.comment("Set to true to log dirt block on common setup").define("logDirtBlock", true);
        magicNumber = builder.comment("A magic number").define("magicNumber", 42);
        magicNumberIntroduction = builder.comment("What you want the introduction message to be for the magic number").define("magicNumberIntroduction", "The magic number is... ");
        ITEM_STRINGS = builder.comment("A list of items to log on common setup.").defineListAllowEmpty(List.of("items"), () -> List.of("minecraft:iron_ingot", "minecraft:gold_ingot"), obj -> obj instanceof final String itemName && ForgeRegistries.ITEMS.containsKey(ResourceLocation.parse(itemName)));
        builder.pop();
        SPEC = builder.build();
    }

    static void setItems() {
        items = ITEM_STRINGS.get().stream().map(itemName -> {
            ResourceLocation rl = ResourceLocation.parse(itemName);
            return ForgeRegistries.ITEMS.containsKey(rl) ? ForgeRegistries.ITEMS.getValue(rl) : null;
        }).filter(item -> item != null).collect(Collectors.toSet());
    }
}
package org.tab.shop_core.config;

import com.electronwill.nightconfig.core.file.CommentedFileConfig;
import net.minecraft.server.packs.resources.ResourceManager;
import net.minecraft.server.packs.resources.ResourceManagerReloadListener;
import net.minecraft.resources.ResourceLocation;
import net.minecraftforge.fml.ModList;
import net.minecraftforge.fml.loading.FMLPaths;
import net.minecraftforge.forgespi.language.IModFileInfo;
import net.minecraftforge.forgespi.locating.IModFile;

import java.io.InputStream;
import java.io.IOException;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;

public class ShopConfigManager implements ResourceManagerReloadListener {
    private static ShopConfigManager INSTANCE;
    
    // 主菜配置
    private Set<String> mealItems = new HashSet<>();
    
    // 调味料配置 (3个等级)
    private final Map<Integer, Set<String>> seasoningConfigs = new HashMap<>();
    
    // number配置 (10个等级)
    private final Map<Integer, Set<String>> numberConfigs = new HashMap<>();
    
    private ShopConfigManager() {
        // 初始化默认配置
        initDefaultConfigs();
        // 加载实际配置
        loadConfigs();
    }
    
    public static ShopConfigManager getInstance() {
        if (INSTANCE == null) {
            INSTANCE = new ShopConfigManager();
        }
        return INSTANCE;
    }
    
    private void initDefaultConfigs() {
        // 初始化默认主菜配置
        mealItems.addAll(getDefaultMealItems());
        
        // 初始化默认调味料配置
        for (int i = 1; i <= 3; i++) {
            seasoningConfigs.put(i, new HashSet<>(getDefaultSeasoningItems(i)));
        }
        
        // 初始化默认number配置
        for (int i = 1; i <= 10; i++) {
            numberConfigs.put(i, new HashSet<>(getDefaultNumberItems(i)));
        }
    }
    
    private void loadConfigs() {
        System.out.println("开始加载配置文件...");
        try {
            // 加载主菜配置
            loadMealConfig();
            
            // 加载调味料配置
            loadSeasoningConfigs();
            
            // 加载number配置
            loadNumberConfigs();
            
            System.out.println("配置文件加载完成");
            System.out.println("主菜配置: " + mealItems);
        } catch (Exception e) {
            System.err.println("加载配置文件时出错: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    private void loadMealConfig() {
        try {
            InputStream stream = getClass().getClassLoader().getResourceAsStream("assets/shop_core/config/meal_restaurant.toml");
            if (stream != null) {
                String content = readInputStream(stream);
                System.out.println("主菜配置文件内容: " + content);
                Set<String> items = parseTomlItemList(content);
                if (!items.isEmpty()) {
                    mealItems = items;
                    System.out.println("成功加载主菜配置: " + items);
                } else {
                    System.out.println("主菜配置解析结果为空");
                }
            } else {
                System.out.println("无法找到主菜配置文件");
            }
        } catch (Exception e) {
            System.err.println("加载主菜配置时出错: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    private void loadSeasoningConfigs() {
        for (int i = 1; i <= 3; i++) {
            try {
                String path = "assets/shop_core/config/seasoning/spice_" + i + ".toml";
                InputStream stream = getClass().getClassLoader().getResourceAsStream(path);
                if (stream != null) {
                    String content = readInputStream(stream);
                    System.out.println("调料配置文件 " + path + " 内容: " + content);
                    Set<String> items = parseTomlItemList(content);
                    seasoningConfigs.put(i, items);
                    System.out.println("成功加载调料等级 " + i + " 配置: " + items);
                    System.out.println("调料等级 " + i + " 包含 " + items.size() + " 个物品");
                } else {
                    System.out.println("无法找到调料配置文件: " + path);
                }
            } catch (Exception e) {
                System.err.println("加载调料配置时出错 (等级 " + i + "): " + e.getMessage());
                e.printStackTrace();
            }
        }
    }
    
    private void loadNumberConfigs() {
        for (int i = 1; i <= 10; i++) {
            try {
                String path = "assets/shop_core/config/number/number_" + i + ".toml";
                InputStream stream = getClass().getClassLoader().getResourceAsStream(path);
                if (stream != null) {
                    String content = readInputStream(stream);
                    System.out.println("Number配置文件 " + path + " 内容: " + content);
                    Set<String> items = parseTomlItemList(content);
                    numberConfigs.put(i, items);
                    System.out.println("成功加载Number等级 " + i + " 配置: " + items);
                    System.out.println("Number等级 " + i + " 包含 " + items.size() + " 个物品");
                } else {
                    System.out.println("无法找到Number配置文件: " + path);
                }
            } catch (Exception e) {
                System.err.println("加载Number配置时出错 (等级 " + i + "): " + e.getMessage());
                e.printStackTrace();
            }
        }
    }
    
    private String readInputStream(InputStream stream) throws IOException {
        StringBuilder content = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(stream))) {
            String line;
            while ((line = reader.readLine()) != null) {
                content.append(line).append("\n");
            }
        }
        return content.toString();
    }
    
    private Set<String> parseTomlItemList(String content) {
        Set<String> items = new HashSet<>();
        String[] lines = content.split("\n");

        System.out.println("开始解析TOML内容: " + content);

        boolean inArray = false;
        for (int i = 0; i < lines.length; i++) {
            String line = lines[i].trim();
            System.out.println("处理第" + i + "行: " + line);
            
            if (!inArray) {
                // 查找数组开始
                if (line.contains("items") && line.contains("=") && line.contains("[")) {
                    System.out.println("检测到数组开始");
                    inArray = true;
                    
                    // 检查是否在同一行结束
                    if (line.contains("]")) {
                        // 单行数组
                        String arrayPart = line.substring(line.indexOf("[") + 1, line.indexOf("]"));
                        if (!arrayPart.trim().isEmpty()) {
                            String[] elements = arrayPart.split(",");
                            for (String element : elements) {
                                String cleanElement = element.trim().replaceAll("\"", "");
                                if (!cleanElement.isEmpty()) {
                                    System.out.println("添加物品: " + cleanElement);
                                    items.add(cleanElement);
                                }
                            }
                        }
                        inArray = false;
                    }
                }
            } else {
                // 处理数组中的元素
                if (line.equals("]")) {
                    // 数组结束
                    System.out.println("数组结束");
                    inArray = false;
                } else if (line.startsWith("\"") && line.endsWith("\"")) {
                    // 数组元素
                    String item = line.substring(1, line.length() - 1);
                    System.out.println("添加物品: " + item);
                    items.add(item);
                } else if (line.startsWith("\"") && line.contains("\",")) {
                    // 一行中有多个元素
                    String[] parts = line.split("\",");
                    for (String part : parts) {
                        part = part.trim();
                        if (part.startsWith("\"")) {
                            if (part.endsWith("\"")) {
                                String item = part.substring(1, part.length() - 1);
                                System.out.println("添加物品: " + item);
                                items.add(item);
                            } else {
                                String item = part.substring(1);
                                System.out.println("添加物品: " + item);
                                items.add(item);
                            }
                        }
                    }
                }
            }
        }

        System.out.println("解析得到的物品列表: " + items);
        System.out.println("总共解析到 " + items.size() + " 个物品");
        return items;
    }
    
    private List<String> getDefaultMealItems() {
        return Arrays.asList(
            "minecraft:bread",
            "minecraft:cooked_beef",
            "minecraft:apple",
            "cuisinedelight:basic_dish"
        );
    }
    
    private List<String> getDefaultSeasoningItems(int level) {
        List<String> items = new ArrayList<>();
        switch (level) {
            case 1:
                items.addAll(Arrays.asList(
                    "minecraft:sugar",
                    "minecraft:wheat_seeds"
                ));
                break;
            case 2:
                items.addAll(Arrays.asList(
                    "minecraft:cocoa_beans",
                    "minecraft:dried_kelp"
                ));
                break;
            case 3:
                items.addAll(Arrays.asList(
                    "minecraft:glow_berries",
                    "minecraft:sweet_berries"
                ));
                break;
        }
        return items;
    }
    
    private List<String> getDefaultNumberItems(int level) {
        List<String> items = new ArrayList<>();
        // 根据等级生成不同的默认物品
        items.add("cuisinedelight:number_item_" + level);
        return items;
    }
    
    @Override
    public void onResourceManagerReload(ResourceManager resourceManager) {
        // 资源重新加载时重新加载配置
        System.out.println("资源重新加载，重新加载配置文件");
        loadConfigs();
    }
    
    public boolean isMealItem(String itemId) {
        boolean result = mealItems.contains(itemId);
        System.out.println("检查物品 " + itemId + " 是否为主菜: " + result);
        System.out.println("当前主菜列表: " + mealItems);
        return result;
    }
    
    public boolean isSeasoningItem(String itemId, int level) {
        Set<String> items = seasoningConfigs.get(level);
        return items != null && items.contains(itemId);
    }
    
    public boolean isNumberItem(String itemId, int level) {
        Set<String> items = numberConfigs.get(level);
        return items != null && items.contains(itemId);
    }
    
    public Set<String> getAllMealItems() {
        return new HashSet<>(mealItems);
    }
    
    public Set<String> getAllSeasoningItems(int level) {
        return new HashSet<>(seasoningConfigs.getOrDefault(level, new HashSet<>()));
    }
    
    public Set<String> getAllNumberItems(int level) {
        return new HashSet<>(numberConfigs.getOrDefault(level, new HashSet<>()));
    }
    
    public int getSeasoningLevel(String itemId) {
        for (int level = 1; level <= 3; level++) {
            if (isSeasoningItem(itemId, level)) {
                return level;
            }
        }
        return 0; // 不是调味料
    }
    
    public int getNumberLevel(String itemId) {
        for (int level = 1; level <= 10; level++) {
            if (isNumberItem(itemId, level)) {
                return level;
            }
        }
        return 0; // 不是number物品
    }
}
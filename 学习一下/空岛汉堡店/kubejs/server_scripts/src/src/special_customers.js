// priority : 999999
function getRandomString(list){
    return list[randomInt(0,list.length-1)]
}
global.specialCustomers={
    10010001:{
        name:"沃利",
        id:10010001,
        skinUUID:'[I;623395646,-246923835,-1740637480,-572423800]',
        isIgnoredByEmployees:false,
        priceModifier:1.0,
        reputationModifier:1.5,
        canSpawn:function(be){
            let menu=be.persistentData.getString("menu").split(",")
            if(menu.includes("83"))return false;
            for(let i=0;i<menu.length;i++){
                if(global.ingredients[menu[i]].type==0&&(menu[i]!=1&&menu[i]!=2))return false;
            }
            if(menu.includes("4")&&menu.includes("7")&&menu.includes("13"))return true;
            return false;
        },
        menuOverride:function(be){
            return "2,4,7,13,1"
        },
        spawnTrigger:function(be,customer){
        },
        noteTrigger:function(be,customer,player){
            player.tell(`${this.name} >> ${getRandomString([
                "就要老一套就好，谢谢。",
                "希望这家汉堡店比我上次去的那家靠谱……",
                "番茄，生菜，鸡蛋，好了。"
            ])}`)
        },
        deliveryTrigger:function(be,customer,player,score,price){
            if(score>=75){
                player.tell(`${this.name} >> ${getRandomString([
                    "非常感谢。",
                    "哇，终于吃到正常的汉堡了。",
                    "好的，谢谢。"
                ])}`)
            }
            else{
                player.tell(`${this.name} >> ${getRandomString([
                    "你这……哎。",
                    "没事，习惯了……",
                    "真的是……没话说。"
                ])}`)
            }
        }
    },
    10010002:{
        name:"Steve?",
        id:10010002,
        skinUUID:'[I;-143431889,659504712,-2144601548,452225857]',
        isIgnoredByEmployees:false,
        priceModifier:1.0,
        reputationModifier:1.5,
        canSpawn:function(be){
            return true;
        },
        menuOverride:null,
        spawnTrigger:function(be,customer){
        },
        noteTrigger:function(be,customer,player){
            player.tell(`${this.name} >> ${getRandomString([
                "*咳咳* 这个，这个，还有这个……",
                "……我的墨镜有什么问题？算了，忘了这事吧。",
                "最近风声有点紧啊。"
            ])}`)
        },
        deliveryTrigger:function(be,customer,player,score,price){
            if(score>=75){
                player.tell(`${this.name} >> ${getRandomString([
                    "谢谢。",
                    `一共是${price}元？好的。`,
                    "……"
                ])}`)
            }
            else{
                player.tell(`${this.name} >> ${getRandomString([
                    "最近真是处处碰壁。",
                    "你小子……算了，现在得低调行事……",
                    "哎。"
                ])}`)
            }
        }
    },
    10010003:{
        name:"石油佬",
        id:10010003,
        skinUUID:'[I;1244873746,-1282719753,-1242229927,-1337597372]',
        isIgnoredByEmployees:false,
        priceModifier:2.0,
        reputationModifier:1.5,
        canSpawn:function(be){
            let menu=be.persistentData.getString("menu").split(",")
            let porks=["21","12","50","51"]
            for(let i=0;i<porks.length;i++){
                if(menu.includes(porks[i]))return false;
            }
            return true;
        },
        menuOverride:null,
        spawnTrigger:function(be,customer){
        },
        noteTrigger:function(be,customer,player){
            player.tell(`${this.name} >> ${getRandomString([
                "麻烦稍微快一点。",
                "这个？这个送你了。",
                "就是这些了，谢谢。"
            ])}`)
            let phase=customer.persistentData.getInt("customerPhase");
            if(phase==7||phase==2)player.give(Item.of("minecraft:gold_ingot"))
        },
        deliveryTrigger:function(be,customer,player,score,price){
            if(score>=75){
                player.tell(`${this.name} >> ${getRandomString([
                    "好的，谢谢。",
                    "很不错呢。",
                    "这个也给你了。"
                ])}`)
                player.give(Item.of("minecraft:gold_ingot"))
            }
            else{
                player.tell(`${this.name} >> ${getRandomString([
                    "切……什么人啊。",
                    "这可不是经商之道啊。",
                    "那个金条你留着吧，下次我不会再来了。"
                ])}`)
            }
        }
    },
    10010004:{
        name:"猪灵妹",
        id:10010004,
        skinUUID:'[I;-226279511,-1840628188,-1730170389,1289670409]',
        isIgnoredByEmployees:false,
        priceModifier:1.0,
        reputationModifier:1.5,
        canSpawn:function(be){
            let menu=be.persistentData.getString("menu").split(",")
            if(menu.includes("74")||menu.includes("75")){
                return false;
            }
            let types=[0,0,0,0,0];
            let pizzatypes=[0,0,0,0];
            for(let i=0;i<menu.length;i++){
                if(global.ingredients[menu[i]].chapter!=4){
                    if(global.ingredients[menu[i]].type)types[global.ingredients[menu[i]].type]++;
                    if(global.ingredients[menu[i]].pizzatype)pizzatypes[global.ingredients[menu[i]].pizzatype]++;
                }
            }
            if(menu.includes("83")){
                return (pizzatypes[0]>0&&pizzatypes[1]>=2&&pizzatypes[2]>=2)
            }
            else{
                return ((types[1]+types[2]+types[4])>=3)
            }
        },
        menuOverride:function(be){
            let rawmenu=be.persistentData.getString("menu").split(",")
            let menu=[];
            for(let i=0;i<rawmenu.length;i++){
                if(global.ingredients[rawmenu[i]].chapter!=4)menu.push(rawmenu[i])
            }
            if(rawmenu.includes("83")){
                return createRandomPizza(menu)
            }
            else{
                return createRandomOrder(menu)
            }
        },
        spawnTrigger:function(be,customer){
        },
        noteTrigger:function(be,customer,player){
            player.tell(`${this.name} >> ${getRandomString([
                "那么……这个，这个，还有这个……",
                "这个，没吃过呢。",
                "哇……要这个，还有这个……好像很好吃。"
            ])}`)
        },
        deliveryTrigger:function(be,customer,player,score,price){
            if(score>=75){
                player.tell(`${this.name} >> ${getRandomString([
                    "这就是主世界的美食吗？看着很棒呢。",
                    "下次我还会再来的哦。",
                    "谢谢！"
                ])}`)
            }
            else{
                player.tell(`${this.name} >> ${getRandomString([
                    "哎……上错了吧。",
                    "我点的不是这个啊。",
                    "怎么回事？"
                ])}`)
            }
        }
    },
    10010005:{
        name:"司机",
        id:10010005,
        skinUUID:'[I;-1125940739,-119524758,-1074054159,1697257393]',
        isIgnoredByEmployees:false,
        priceModifier:1.0,
        reputationModifier:1.5,
        canSpawn:function(be){
            return true;
        },
        menuOverride:null,
        spawnTrigger:function(be,customer){
        },
        noteTrigger:function(be,customer,player){
            player.tell(`${this.name} >> ${getRandomString([
                "嘛，上班前来打包个午餐。",
                "怎么了，骨头架子不能吃饭吗？",
                "一共就是这些，谢谢。"
            ])}`)
        },
        deliveryTrigger:function(be,customer,player,score,price){
            if(score>=75){
                player.tell(`${this.name} >> ${getRandomString([
                    "啊，谢谢。",
                    "我去！都这个点了！",
                    "看着还不错……"
                ])}`)
            }
            else{
                player.potionEffects.add('minecraft:wither',100)
                player.tell(`${this.name} >> ${getRandomString([
                    "……",
                    "…………",
                    "………………"
                ])}`)
            }
        }
    },
    10010006:{
        name:"？？？",
        id:10010006,
        skinUUID:'[I;32986524,1920415552,-1677763668,833658134]',
        isIgnoredByEmployees:false,
        priceModifier:1.0,
        reputationModifier:1.5,
        canSpawn:function(be){
            return true;
        },
        menuOverride:null,
        spawnTrigger:function(be,customer){
        },
        noteTrigger:function(be,customer,player){
            player.tell(`${this.name} >> ${getRandomString([
                "……",
                "…………",
                "………………"
            ])}`)
        },
        deliveryTrigger:function(be,customer,player,score,price){
            if(score>=75){
                player.tell(`${this.name} >> ${getRandomString([
                    "………………",
                    "…………",
                    "……"
                ])}`)
            }
            else{
                player.tell(`${this.name} >> ${getRandomString([
                    "……？",
                    "………！…",
                    "…………………………"
                ])}`)
            }
        }
    },
    10010007:{
        name:"麦当劳小哥",
        id:10010007,
        skinUUID:'[I;780969016,679426114,-2119262022,-2082297957]',
        isIgnoredByEmployees:false,
        priceModifier:1.0,
        reputationModifier:1.5,
        canSpawn:function(be){
            return true;
        },
        menuOverride:null,
        spawnTrigger:function(be,customer){
        },
        noteTrigger:function(be,customer,player){
            player.tell(`${this.name} >> ${getRandomString([
                "嘛……工作是工作，生活是生活。",
                "老板稍微快一点行不？一会我还要去换班。",
                "休息时间来不及换制服啦，老板你冷静，不是来踢馆的……"
            ])}`)
        },
        deliveryTrigger:function(be,customer,player,score,price){
            if(score>=75){
                player.tell(`${this.name} >> ${getRandomString([
                    "好的，谢谢老板！",
                    "这材料成色看着就很棒！",
                    "谢谢！"
                ])}`)
            }
            else{
                player.tell(`${this.name} >> ${getRandomString([
                    "你这……我还不如在后厨偷吃点呢。",
                    "……你们这就是这么服务顾客的？",
                    "我工作要是有你这么轻松我做梦都能笑醒。"
                ])}`)
            }
        }
    },
    10010008:{
        name:"僵尸猪人",
        id:10010008,
        skinUUID:'[I;-1142442308,1533687317,-1337866399,-1880281515]',
        isIgnoredByEmployees:false,
        priceModifier:1.0,
        reputationModifier:1.5,
        canSpawn:function(be){
            let menu=be.persistentData.getString("menu").split(",")
            let types=[0,0,0,0,0];
            let pizzatypes=[0,0,0,0];
            for(let i=0;i<menu.length;i++){
                if(global.ingredients[menu[i]].chapter==4){
                    if(global.ingredients[menu[i]].type)types[global.ingredients[menu[i]].type]++;
                    if(global.ingredients[menu[i]].pizzatype)pizzatypes[global.ingredients[menu[i]].pizzatype]++;
                }
            }
            if(menu.includes("83")){
                return (pizzatypes[0]>0&&pizzatypes[1]>=2&&pizzatypes[2]>=2)
            }
            else{
                return ((types[1]+types[2]+types[4])>=3)
            }
        },
        menuOverride:function(be){
            let rawmenu=be.persistentData.getString("menu").split(",")
            let menu=[];
            for(let i=0;i<rawmenu.length;i++){
                if(global.ingredients[rawmenu[i]].chapter==4||global.ingredients[rawmenu[i]].type==0)menu.push(rawmenu[i])
            }
            if(rawmenu.includes("83")){
                menu.push(83)
                return createRandomPizza(menu)
            }
            else{
                return createRandomOrder(menu)
            }
        },
        spawnTrigger:function(be,customer){
        },
        noteTrigger:function(be,customer,player){
            player.tell(`${this.name} >> ${getRandomString([
                "听说你这里有卖……那次更新的食物。",
                "就是这些了。这些……",
                "……一共就是这些，谢谢。"
            ])}`)
        },
        deliveryTrigger:function(be,customer,player,score,price){
            if(score>=75){
                player.tell(`${this.name} >> ${getRandomString([
                    "…………",
                    "好的。谢谢……",
                    "……谢谢。…………"
                ])}`)
            }
            else{
                player.tell(`${this.name} >> ${getRandomString([
                    "上错菜了。",
                    "他们就是为了这些……我……",
                    "哎……"
                ])}`)
            }
        }
    },
}
/**
 * 
 * @param {$BlockEntityJS_} be 
 * @param {$LivingEntity_} customer 
 */
function specialcustomerattempt(be,customer){
    let arr=Object.keys(global.specialCustomers)
    let potentialsc=global.specialCustomers[arr[randomInt(0,arr.length-1)]];
    if(potentialsc.canSpawn(be)){
        potentialsc.spawnTrigger(be,customer);
        customer.persistentData.putInt("specialcustomer",potentialsc.id)
        customer.mergeNbt(`{SkinData:{SkinUUID:${potentialsc.skinUUID},SkinType:"CUSTOM",Skin:""}}`)
        customer.setCustomName(Text.of(potentialsc.name))
        if(potentialsc.menuOverride!=null){
            customer.persistentData.putString("customerOrder",potentialsc.menuOverride(be))
        }
    }
}
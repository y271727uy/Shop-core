
/*
示例mod
个人建议 制作的mod脚本放在这个文件夹
热加载/卸载脚本按顺序执行：
/kubejs reload startup_scripts
/kubejs reload server_scripts
/kubejs reload client_scripts
F3+T
*/

/*
注册新材料环节 具体介绍：
最前面的数字（1001001）代表材料编号，相同编号的材料会互相覆盖
个人建议前四位（1001）保持一致，后三位（001）次序递增，以减少撞车的几率
id：物品的id，游戏内用f3+h可以查看
type：材料的类型，0是面包，1是肉类，2是蔬菜，3是酱料，4是其他
price：单价
extraprice：附加价
favor：订单*继续*概率，游戏内显示的订单结束概率是1-favor
chapter：材料所属的章节，与声望加值相关
bottom：仅对汉堡面包顶有意义，即这个汉堡面包顶所对应的面包底的编号；汉堡面包底的bottom应为-1
*/
const exampleMod_newIngredients={
    1001001:{id:"minecraft:bread",type:0,price:8,extraprice:-10,favor:1.0,chapter:1,bottom:1001001},
	"minecraft:bread":1001001,
    1001002:{id:"minecraft:cooked_beef",type:1,price:14,extraprice:1,favor:0.2,chapter:1},
	"minecraft:cooked_beef":1001002,
}
/*
只要将这个Object.assign前面的“//”删掉
那么就可以将新增的材料注册进材料列表
*/
//Object.assign(global.ingredients,exampleMod_newIngredients)
/*
这里是给新增的汉堡面包注册上SAR的汉堡面包tag
这样它就可以作为底部面包片，同时用其制作的三明治名字显示为汉堡
*/
ServerEvents.tags('item', event => {
    event.add('some_assembly_required:burger_buns', 'minecraft:bread')
    event.add('pizzacraft:ingredients/cheese_layer', 'vintagedelight:cheese_slice')
})
/*
注册新额外商品环节 具体介绍：
编号：同上
id：同上
type：额外商品的类型，1是小吃，2是饮料
pricemod：价格乘数：比如1.5是+50%，0.5是-50%
repmod：声望乘数
*/
const exampleMod_newSnacks={
    1001001:{id:"minecraft:golden_apple",type:1,pricemod:1,repmod:2},
	"minecraft:golden_apple":1001001,
    1001002:{id:"minecraft:water_bucket",type:2,pricemod:2,repmod:1},
	"minecraft:water_bucket":1001002,
}
/*
只要将这个Object.assign前面的“//”删掉
那么就可以将新增的小吃注册进小吃列表
*/
//Object.assign(global.snacks,exampleMod_newSnacks)

const exampleMod_newSpecialCustomers={
    //稀客的索引id
    10020001:{
        //稀客的名字，会显示在稀客头上和对话中
        name:"牢大",
        //稀客的ID，需要和稀客的索引ID保持一致
        id:10020001,
        //皮肤的UUID，具体获取方法在任务里面有说
        skinUUID:'[I;623395646,-246923835,-1740637480,-572423800]',
        //如果设置为true，工作中的员工会赶走该稀客，避免该稀客堵塞队伍
        //如果稀客会点菜单外的菜，建议设置为true
        isIgnoredByEmployees:false,
        //价格修正乘数
        //2.0就是二倍价格
        priceModifier:1.0,
        //声望修正乘数
        //2.0就是两倍声望
        reputationModifier:1.5,
        //是否能生成该稀客
        //在这里，只有菜单中不包含面团（汉堡店模式）并且包含烈焰汉堡和烈焰酱的时候，才会生成。
        canSpawn:function(be){
            let menu=be.persistentData.getString("menu").split(",")
            if(menu.includes("83"))return false;
            if(menu.includes("54")&&menu.includes("74")&&menu.includes("75"))return true;
            return false;
        },
        //覆写订单
        //如果设置为menuOverride:null的话 可以不用覆写订单
        //这里会固定要一个夹了三层烈焰酱的烈焰汉堡
        menuOverride:function(be){
            return "75,54,54,54,74"
        },
        //生成时触发的函数
        //be代表柜台的方块实体，customer代表顾客实体
        spawnTrigger:function(be,customer){
        },
        //记录订单时触发的函数
        //be代表柜台的方块实体，customer代表顾客实体，player代表玩家实体
        noteTrigger:function(be,customer,player){
            //预先准备好的说话格式
            //可以从以下列表中随机选择话来说
            //当然你可以用自己的方法让顾客说话
            //或者让顾客做些别的？
            player.tell(`${this.name} >> ${getRandomString([
                "Man",
                "What",
                "Can",
                "I",
                "Say",
            ])}`)
        },
        //交付订单时触发的函数
        //be代表柜台的方块实体，customer代表顾客实体，player代表玩家实体
        //score代表分数，price代表价格
        deliveryTrigger:function(be,customer,player,score,price){
            //这里根据分数来区分说话内容
            //75+是第一档和第二档满意程度
            //当然你可以具体区分
            if(score>=75){
                player.tell(`${this.name} >> ${getRandomString([
                    "Manba",
                    "out"
                ])}`)
            }
            else{
                //当然，你也可以在这里放上说话之外的东西
                //比如这里牢大会肘击掉玩家两颗心
                player.attack(4)
                player.tell(`${this.name} >> ${getRandomString([
                    "沙克也干了！"
                ])}`)
            }
        }
    },
}
/*
只要将这个Object.assign前面的“//”删掉
那么就可以将新增的稀客注册进稀客列表
*/
//Object.assign(global.specialCustomers,exampleMod_newSpecialCustomers)

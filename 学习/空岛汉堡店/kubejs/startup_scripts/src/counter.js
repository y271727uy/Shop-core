// priority: 0
// Visit the wiki for more info - https://kubejs.com/
global.tableTick = function (entity) {
}
global.botTick = function (entity) {
}
StartupEvents.registry("block", (event) => {
  event.create("counter").unbreakable()
    //.textureAll("kubejs:block/counter_side")
	//.texture("up","kubejs:block/counter_top")
	//.texture("down","kubejs:block/counter_bottom")
    .textureAll('kubejs:block/sandwiching_station_side')
    .textureSide(Direction.up,'kubejs:block/sandwiching_station_top')
    .textureSide(Direction.DOWN,'kubejs:block/sandwiching_station_bottom')
	.woodSoundType()
    .blockEntity((entityInfo) => {
      entityInfo.serverTick(1, 0, (entity) => {
          global.tableTick(entity)
      })
    })
	event.create("burgerbot_iron")
    .textureAll("kubejs:block/burgerbot_iron")
	.stoneSoundType()
    .blockEntity((entityInfo) => {
	  entityInfo.inventory(9, 6);
      entityInfo.rightClickOpensInventory();
      entityInfo.serverTick(20, 0, (entity) => {
          global.botTick(entity,0.5,6)
      })
      entityInfo.attachCapability(
        CapabilityBuilder.ITEM.blockEntity()
            .availableOn((be,dir)=>dir!=Direction.up)
            .extractItem((be,slot,amount,simulate)=>be.inventory.extractItem(slot,amount,simulate))
            .insertItem((be,slot,stack,simulate)=>be.inventory.insertItem(slot,stack,simulate))
            .getSlotLimit((be,slot)=>be.inventory.getSlotLimit(slot))
            .getSlots(be=>be.inventory.slots)
            .getStackInSlot((be,slot)=>be.inventory.getStackInSlot(slot))
            .isItemValid((be,slot,stack)=>be.inventory.isItemValid(slot,stack))
        )
    })
	event.create("burgerbot_gold")
    .textureAll("kubejs:block/burgerbot_gold")
	.stoneSoundType()
    .blockEntity((entityInfo) => {
	  entityInfo.inventory(9, 6);
      entityInfo.rightClickOpensInventory();
      entityInfo.serverTick(20, 0, (entity) => {
          global.botTick(entity,0.75,4)
      })
      entityInfo.attachCapability(
        CapabilityBuilder.ITEM.blockEntity()
            .availableOn((be,dir)=>dir!=Direction.up)
            .extractItem((be,slot,amount,simulate)=>be.inventory.extractItem(slot,amount,simulate))
            .insertItem((be,slot,stack,simulate)=>be.inventory.insertItem(slot,stack,simulate))
            .getSlotLimit((be,slot)=>be.inventory.getSlotLimit(slot))
            .getSlots(be=>be.inventory.slots)
            .getStackInSlot((be,slot)=>be.inventory.getStackInSlot(slot))
            .isItemValid((be,slot,stack)=>be.inventory.isItemValid(slot,stack))
        )
    })
	event.create("burgerbot")
    .textureAll("kubejs:block/burgerbot")
	.stoneSoundType()
    .blockEntity((entityInfo) => {
	  entityInfo.inventory(9, 6);
      entityInfo.rightClickOpensInventory();
      entityInfo.serverTick(20, 0, (entity) => {
          global.botTick(entity,1,2)
      })
      entityInfo.attachCapability(
        CapabilityBuilder.ITEM.blockEntity()
            .availableOn((be,dir)=>dir!=Direction.up)
            .extractItem((be,slot,amount,simulate)=>be.inventory.extractItem(slot,amount,simulate))
            .insertItem((be,slot,stack,simulate)=>be.inventory.insertItem(slot,stack,simulate))
            .getSlotLimit((be,slot)=>be.inventory.getSlotLimit(slot))
            .getSlots(be=>be.inventory.slots)
            .getStackInSlot((be,slot)=>be.inventory.getStackInSlot(slot))
            .isItemValid((be,slot,stack)=>be.inventory.isItemValid(slot,stack))
        )
    })
	event.create("string_duper")
    .textureAll("kubejs:block/string_duper")
	.woodSoundType()
    .blockEntity((entityInfo) => {
      entityInfo.inventory(9, 3);
      entityInfo.rightClickOpensInventory();
      entityInfo.serverTick(1, 0, (entity) => {
        entity.inventory.insertItem(Item.of("minecraft:string"), false);
      })
      entityInfo.attachCapability(
        CapabilityBuilder.ITEM.blockEntity()
            .availableOn((be,dir)=>dir!=Direction.up)
            .extractItem((be,slot,amount,simulate)=>be.inventory.extractItem(slot,amount,simulate))
            .insertItem((be,slot,stack,simulate)=>be.inventory.insertItem(slot,stack,simulate))
            .getSlotLimit((be,slot)=>be.inventory.getSlotLimit(slot))
            .getSlots(be=>be.inventory.slots)
            .getStackInSlot((be,slot)=>be.inventory.getStackInSlot(slot))
            .isItemValid((be,slot,stack)=>be.inventory.isItemValid(slot,stack))
        )
    })
})


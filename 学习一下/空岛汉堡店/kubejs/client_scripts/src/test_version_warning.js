PlayerEvents.tick(event => {
	let player = event.player
	
	player.paint({
		testVersionWarning: {
			type: 'text',
			text: '当前版本为测试版本，不代表最终游戏品质',
			x: 0,
			y: 30,
			scale: 1.5,
			alignX: 'center',
			alignY: 'top',
			draw: 'ingame',
			visible: true
		}
	})
})
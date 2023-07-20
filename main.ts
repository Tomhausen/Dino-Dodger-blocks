function spawn_vertical () {
    y = 20
    for (let index = 0; index < 4; index++) {
        if (randint(1, 5) == 1) {
            continue;
        }
        dino = make_dino()
        dino.y = y
        if (randint(1, 2) == 1) {
            dino.left = 155
            dino.vx = speed * -1
            animation.runImageAnimation(
            dino,
            assets.animation`run left`,
            100,
            true
            )
        } else {
            dino.right = 5
            dino.vx = speed
        }
        y += 40
    }
}
function rumble () {
    if (sprites.allOfKind(SpriteKind.Enemy).length > 0) {
        scene.cameraShake(4, 10)
    }
}
function spawn_horizontal () {
    x = 20
    for (let index = 0; index < 3; index++) {
        if (randint(1, 5) == 1) {
            continue;
        }
        dino = make_dino()
        dino.x = x
        if (randint(1, 2) == 1) {
            dino.bottom = 5
            dino.vy = speed
        } else {
            dino.top = 115
            dino.vx = speed * -1
        }
        x += 40
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (player_sprite, dino) {
    game.over(false)
})
function make_dino () {
    dino = sprites.create(assets.image`dino`, SpriteKind.Enemy)
    animation.runImageAnimation(
    dino,
    assets.animation`run right`,
    100,
    true
    )
    dino.setFlag(SpriteFlag.AutoDestroy, true)
    return dino
}
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    info.changeScoreBy(100)
})
let x = 0
let dino: Sprite = null
let y = 0
let speed = 0
speed = 75
let player1 = sprites.create(assets.image`player1`, SpriteKind.Player)
controller.moveSprite(player1)
scene.setBackgroundImage(assets.image`background`)
game.onUpdate(function () {
    rumble()
})
game.onUpdateInterval(5000, function () {
    if (randint(1, 2) == 1) {
        spawn_horizontal()
    } else {
        spawn_vertical()
    }
})

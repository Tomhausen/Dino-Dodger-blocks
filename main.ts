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
            dino.vy = speed * -1
        }
        x += 40
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (player_sprite, dino) {
    info.changeLifeBy(-1)
    timer.background(function () {
        for (let index = 0; index < 3; index++) {
            player1.setFlag(SpriteFlag.Invisible, true)
            pause(300)
            player1.setFlag(SpriteFlag.Invisible, false)
            pause(300)
        }
    })
    pause(2000)
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
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeLifeBy(1)
    sprites.destroy(otherSprite)
})
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    info.changeScoreBy(100)
})
let heart: Sprite = null
let x = 0
let dino: Sprite = null
let y = 0
let player1: Sprite = null
let speed = 0
speed = 75
player1 = sprites.create(assets.image`player1`, SpriteKind.Player)
controller.moveSprite(player1)
scene.setBackgroundImage(assets.image`background`)
info.setLife(3)
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
game.onUpdateInterval(10000, function () {
    heart = sprites.create(assets.image`heart`, SpriteKind.Food)
    heart.setPosition(randint(10, 150), randint(10, 110))
    heart.lifespan = 5000
})

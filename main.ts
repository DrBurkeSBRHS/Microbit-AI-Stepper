ml.onStart(ml.event.Step, function () {
    basic.showIcon(IconNames.QuarterNote)
    walking = true
})
ml.onStart(ml.event.Still, function () {
    basic.showIcon(IconNames.Asleep)
    walking = false
})
input.onButtonPressed(Button.AB, function () {
    countdown = 5
    while (!(input.buttonIsPressed(Button.AB)) && countdown > 0) {
        walking = false
        basic.showNumber(countdown)
        countdown += -1
    }
    if (countdown > 0) {
        datalogger.log(datalogger.createCV("Steps", steps))
        steps = 0
        basic.showString("Logged and Reset")
    } else {
        basic.showString("No Reset")
    }
})
input.onButtonPressed(Button.B, function () {
    basic.showNumber(steps)
})
let countdown = 0
let walking = false
let steps = 0
steps = 0
datalogger.setColumnTitles(
"Run",
"Steps"
)
basic.forever(function () {
    if (walking) {
        if (input.acceleration(Dimension.Strength) > 1500) {
            steps += 1
        }
    }
})

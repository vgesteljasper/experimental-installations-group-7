# experimental-installations-group-7
School group assignment for Experimental Installations

## Installation

considering you have nodejs and yarn already installed on your system:

### Step 1.

```Bash
yarn install
./node_modules/.bin/electron-rebuild
```

### Step 2.

Install the `/arduino` folder onto your Arduino.

## Usage

```Bash
yarn start
```

> NOTE: If you're running this game without the Arduino and arcade counterparts, you can fill in `null` when asked for the Arduino serialport.
> This will let you play the game with your keyboard.

> NOTE: Use `ls /dev/tty.*` on MacOS to find out your Arduino's serialport

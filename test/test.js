const assert = require('assert');
const { Builder, By, Key } = require('selenium-webdriver');

describe('Play Button Visibility Test', function () {
    this.timeout(30000);

    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    it('should check the visibility of the Play button', async function () {
        await driver.get('C:\\Users\\235na\\WebstormProjects\\mogul-christmas\\index.html');

        // Find play button using id play-btn
        let playButton = await driver.findElement(By.id('play-btn'));

        // Play button should be displayed
        let isPlayButtonDisplayedInitially = await playButton.isDisplayed();
        assert.strictEqual(isPlayButtonDisplayedInitially, true);

        // Click on the play button
        await playButton.click();
        await driver.sleep(3000);

        // Play button should be hidden
        let isPlayButtonHidden = await playButton.isDisplayed();
        assert.strictEqual(isPlayButtonHidden, false);

        await driver.sleep(2000);
    });

    after(async function () {
        await driver.quit();
    });
});

describe('Mode Switch Test', function () {
    this.timeout(30000);

    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    it('should change mode from light to dark', async function () {
        await driver.get('C:\\Users\\235na\\WebstormProjects\\mogul-christmas\\index.html');

        let bodyElement = await driver.findElement(By.tagName('body'));

        // Should be light mode
        let isLightMode = await bodyElement.getAttribute('data-mode') === 'light';

        // Find button by id round and click on this button
        let toggleButton = await driver.findElement(By.id('round'));
        await toggleButton.click();
        await driver.sleep(1000);

        // Mode should be dark
        let updatedMode = await bodyElement.getAttribute('data-mode');
        assert.strictEqual(isLightMode, updatedMode === 'dark');
    });

    after(async function () {
        await driver.quit();
    });
});

describe('Clear Time Left Test', function () {
    this.timeout(30000);

    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    it('should clear the active class from time left elements', async function () {
        await driver.get('C:\\Users\\235na\\WebstormProjects\\mogul-christmas\\index.html');

        // Simulation of active class
        let firstTimeLeftElement = await driver.findElement(By.css('.song_item .time-left'));
        await driver.executeScript("arguments[0].classList.add('active')", firstTimeLeftElement);

        // clearTimeLeft() should remove active class
        await driver.executeScript("clearTimeLeft()");

        // Get class from time left
        let updatedFirstTimeLeftElement = await driver.findElement(By.css('.song_item .time-left'));
        let classes = await updatedFirstTimeLeftElement.getAttribute('class');
        let hasActiveClass = /active/.test(classes);   // regular expression
        // class active should be removed
        assert.strictEqual(hasActiveClass, false);
    });

    after(async function () {
        await driver.quit();
    });
});


describe('Volume Change Test', function () {
    this.timeout(30000);

    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    it('should change the volume', async function () {
        await driver.get('C:\\Users\\235na\\WebstormProjects\\mogul-christmas\\index.html');

        // Find volume bar
        let volumeBar = await driver.findElement(By.id('volume-bar'));
        await driver.sleep(1000);

        // Get value of initial volume
        let initialVolume = await volumeBar.getAttribute('value');
        await driver.sleep(1000);

        // Change volume using arrow
        await driver.actions().click(volumeBar).sendKeys(Key.ARROW_RIGHT).perform();
        await driver.sleep(1000);

        // Get updated volume
        let updatedVolume = await volumeBar.getAttribute('value');
        await driver.sleep(1000);

        // Updated volume should be different from initial volume
        assert.notStrictEqual(initialVolume.trim(), updatedVolume.trim());
    });

    after(async function () {
        await driver.quit();
    });
});

describe('Play Song from Playlist Test', function () {
    this.timeout(30000);

    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    it('should play a song from the playlist', async function () {
        await driver.get('C:\\Users\\235na\\WebstormProjects\\mogul-christmas\\index.html');

        // Find song using id
        let songElement = await driver.findElement(By.id('song_Little_Saint_Nick'));

        // Click on the song
        await songElement.click();
        await driver.sleep(3000);

        // Play button should be hidden when song is playing
        let playState = await driver.executeScript(
            'return document.querySelector("#play-btn").classList.contains("hidden")'
        );
        assert.strictEqual(playState, true);
    });

    after(async function () {
        await driver.quit();
    });
});

describe('Play Pause Test', function () {
    this.timeout(30000);

    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    it('should play and pause the video', async function () {
        await driver.get('C:\\Users\\235na\\WebstormProjects\\mogul-christmas\\index.html');

        // Find play button and pause button
        let playButton = await driver.findElement(By.id('play-btn'));
        let pauseButton = await driver.findElement(By.id('pause-btn'));

        // Click on the play button
        await playButton.click();
        await driver.sleep(3000);

        // Check if the pause button is displayed after click on the play button
        let isPauseButtonDisplayed = await pauseButton.isDisplayed();
        assert.strictEqual(isPauseButtonDisplayed, true);

        // Click on the pause button
        await pauseButton.click();
        await driver.sleep(3000); // Wait for the video to pause

        // Check if the play button is displayed after click on the pause button
        let isPlayButtonDisplayed = await playButton.isDisplayed();
        assert.strictEqual(isPlayButtonDisplayed, true);
    });

    after(async function () {
        await driver.quit();
    });
});

describe('Stop Button Test', function () {
    this.timeout(30000);

    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    it('should stop the music', async function () {
        await driver.get('C:\\Users\\235na\\WebstormProjects\\mogul-christmas\\index.html');

        // Find play button
        let playButton = await driver.findElement(By.id('play-btn'));

        // Click on the play button
        await playButton.click();
        await driver.sleep(3000);

        // Check if the play button is hidden after click on the play button
        let isPlayButtonHidden = await playButton.isDisplayed();
        assert.strictEqual(isPlayButtonHidden, false);

        // Find stop button
        let stopButton = await driver.findElement(By.id('stop-btn'));

        // Click the stop button
        await stopButton.click();
        await driver.sleep(2000);

        // Check if the play button is displayed after click on the stop button
        let isPlayButtonDisplayed = await playButton.isDisplayed();
        assert.strictEqual(isPlayButtonDisplayed, true);
    });

    after(async function () {
        await driver.quit();
    });
});

describe('Christmas Day Message Test', function () {
    this.timeout(30000);

    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    it('should display Christmas message on Christmas Day', async function () {
        await driver.get('C:\\Users\\235na\\WebstormProjects\\mogul-christmas\\index.html');

        // Find element christmas_day_message
        let messageDisplay = await driver.findElement(By.css('.christmas_day_message'));

        // Get today's date
        let currentDate = new Date();

        // Check if it's Christmas Day
        if (currentDate.getMonth() === 11 && currentDate.getDate() === 25) {
            // style should be set to 'block'
            let displayStyle = await messageDisplay.getAttribute('style');
            assert.strictEqual(displayStyle, 'display: block;');
            await driver.sleep(2000);
        } else {
            // style should be set to 'none'
            let displayStyle = await messageDisplay.getAttribute('style');
            assert.strictEqual(displayStyle, 'display: none;');
            await driver.sleep(2000);
        }
    });

    after(async function () {
        await driver.quit();
    });
});

describe('Christmas Day Countdown Message Test', function () {
    this.timeout(30000);

    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    it('should display countdown days until Christmas', async function () {
        await driver.get('C:\\Users\\235na\\WebstormProjects\\mogul-christmas\\index.html');

        // Find element christmasDayCountdown
        let countdownElement = await driver.findElement(By.id('christmasDayCountdown'));
        await driver.sleep(2000);

        // Get the text content of the countdown element
        let countdownText = await countdownElement.getText();
        await driver.sleep(2000);

        // Check if the countdown text contains 'days left until Christmas'
        assert.strictEqual(countdownText.includes('days left until Christmas'), true);
    });

    after(async function () {
        await driver.quit();
    });
});

describe('Christmas Day Countdown Test', function () {
    this.timeout(30000);

    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    it('should display the correct number of days until Christmas', async function () {
        await driver.get('C:\\Users\\235na\\WebstormProjects\\mogul-christmas\\index.html');

        // Find element christmasDayCountdown
        let countdownElement = await driver.findElement(By.id('christmasDayCountdown'));
        await driver.sleep(2000);

        // Get the text content of the countdown element
        let countdownText = await countdownElement.getText();

        // Extract the number of days from the text
        let daysLeft = parseInt(countdownText.match(/\d+/)[0]);

        // Calculate the expected number of days until Christmas
        let currentDate = new Date();
        let christmasDay = new Date("Dec 25, 2023 23:59:59");
        //if (currentDate.getMonth() === 11 && currentDate.getDate() > 25) {
          //  christmasDay.setFullYear(christmasDay.getFullYear() + 1); // If Christmas has passed, set it to next year
        //}
        let differenceInTime = christmasDay.getTime() - currentDate.getTime();
        let expectedDaysLeft = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));

        // Compare the actual days left with the expected days left
        assert.strictEqual(daysLeft, expectedDaysLeft);
    });

    after(async function () {
        await driver.quit();
    });
});
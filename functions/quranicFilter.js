const stringSimilarity = require('string-similarity');
const jsdiff = require('diff');
const levenshtein = require('js-levenshtein');

// -------------------- FLATTEN VERSE ARRAY FUNCTION ---------------------------- //
const flattenVerses = (verses, option) => {
    const flattenVerses = verses.map(verse => verse.textual[0].text); // Flatten all verses
    const flattenVersesRemovingBasmalah = flattenVerses.map(verse => removeBasmalah(verse));
    return option ? flattenVersesRemovingBasmalah : flattenVersesRemovingBasmalah.map(verse => removeTashkeel(verse));
}

// -------------------- REMOVING BASMALAH FOR FILTER PURPOSE ---------------------------- //
const removeBasmalah = (verse) => {
    return verse.startsWith('بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ') ? verse.replace(/بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ /g, '') : verse;
}

// -------------------- REMOVING TASHKEEL FOR FILTER PURPOSE ---------------------------- //
const removeTashkeel = (verse) => {
    return verse.match(/[\u0621-\u064A\s\u0671-\u0673]/g).join('').replace(/[\u0671\u0622\u0623\u0625]/g, `\u0627`);
}

// -------------------- FIND BEST MATCH FUNCTION ---------------------------- //
export const findBestVerseMatch = (userInput, verses, tashkeelOption) => {
    // Change error threshold here
    const errorThreshold = 0.4;

    // Processing strings of verses
    const versesProcessed = flattenVerses(verses, tashkeelOption);

    // Finding best match
    const similarityFilter = stringSimilarity.findBestMatch(userInput, versesProcessed);

    // Returning verse object best match
    return similarityFilter.bestMatch.rating >= errorThreshold
    ? verses[similarityFilter.bestMatchIndex]
    : null;
}

// -------------------- ERROR FILTERING FUNCTION ---------------------------- //
export const errorFilter = (userInput, bestMatch, tashkeelOption) => {
    bestMatch = removeBasmalah(bestMatch);
    if (!tashkeelOption) {
        bestMatch = removeTashkeel(bestMatch);
    }

    let result = jsdiff.diffChars(userInput, bestMatch);
    return result;
}

// ------------------------ ERROR DISTANCE CALCULATION ------------------------ //
export const errorDistance = (verse, userInput, tashkeelOption) => {
    const verseProcessed = removeBasmalah(verse);
    if(!tashkeelOption) {
        verseProcessed = removeTashkeel(verseProcessed);
    }
    return levenshtein(verseProcessed, userInput);
}

// ---------------------- VERSE RANDOMISER --------------------------------- //
export const verseRondomiser = async(juz = 0, chapter = 0) => {
    let verseArray = [];
    let fetcher = null;
    let selection = null;

    // Fetch verses first before randoming
    if(juz)
    {
        fetcher = fetchVersesOneJuz(juz).then(verses => {
            verseArray = verseArray.concat(verses);
        })
    }
    else if (chapter)
    {
        fetcher = fetchVersesOneChapter(chapter).then(verses => {
            verseArray = verseArray.concat(verses);
        })
    }
    else
    {
        fetcher = fetchVerses().then(verses => {
            verseArray = verseArray.concat(verses);
        })
    }

    await fetcher.then(() => {
        // Generate random number from verses length
        let randomIndex = Math.floor(Math.random()*verseArray.length);

        // Select verse using randomIndex
        selection = verseArray[randomIndex];
    });

    return selection;
}
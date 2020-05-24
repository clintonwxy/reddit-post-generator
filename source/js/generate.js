

function generateSentence(dictionary) {

    var randomFirstTwoWords = dictionary["first"][Math.floor(Math.random() * dictionary["first"].length) - 1];
    var randomFirstWord = randomFirstTwoWords.substr(0, randomFirstTwoWords.indexOf(" "));
    var randomNextWord = randomFirstTwoWords.substr(randomFirstTwoWords.indexOf(" ") + 1);

    var sentence = randomFirstWord.charAt(0).toUpperCase() + randomFirstWord.slice(1) + " " +
        randomNextWord;

    var randomFollowingWord = dictionary["next"][randomFirstWord][randomNextWord][dictionary["next"][randomFirstWord][randomNextWord].length - 1];

    while (randomFollowingWord != "endend") {
        sentence = sentence + " " + randomFollowingWord;
        randomFirstWord = randomNextWord;
        randomNextWord = randomFollowingWord;
        randomFollowingWord = dictionary["next"][randomFirstWord][randomNextWord][dictionary["next"][randomFirstWord][randomNextWord].length - 1];
    }

    return (sentence + ". ");
}

function generateSentences(dictionary, lower, upper) {

    var n_sentences = Math.floor(Math.random() * lower) + (upper - lower + 1) // Average posts range from 2 to 7 sentences 
    var sentences = "";

    while (n_sentences > 0) {
        sentences += generateSentence(dictionary);
        n_sentences--;
    }

    return sentences
}

function generate() {

    document.getElementById("displayTitle").innerHTML = generateSentences(dictionary_reddit_title, 1, 1);
    document.getElementById("displayPost").innerHTML = generateSentences(dictionary_reddit_post, 3, 5);
    document.getElementById("displayComment").innerHTML = generateSentences(dictionary_reddit_comment, 1, 2);

}



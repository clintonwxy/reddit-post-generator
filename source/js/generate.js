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

    document.getElementById("postUpvoteNumber").innerHTML = Math.floor(Math.random() * 150);
    document.getElementById("postPoster").innerHTML = dictionary_reddit_names[Math.floor(Math.random() * dictionary_reddit_names.length)];
    var postTime = Math.floor(Math.random() * 22) + 1;
    document.getElementById("postTime").innerHTML = postTime

    document.getElementById("postComment1Poster").innerHTML = dictionary_reddit_names[Math.floor(Math.random() * dictionary_reddit_names.length)];
    document.getElementById("postComment2Poster").innerHTML = dictionary_reddit_names[Math.floor(Math.random() * dictionary_reddit_names.length)];
    document.getElementById("postComment3Poster").innerHTML = dictionary_reddit_names[Math.floor(Math.random() * dictionary_reddit_names.length)];

    document.getElementById("postComment1Points").innerHTML = Math.floor(Math.random() * 30);
    document.getElementById("postComment2Points").innerHTML = Math.floor(Math.random() * 30);
    document.getElementById("postComment3Points").innerHTML = Math.floor(Math.random() * 30);

    var commentTime = Math.floor(Math.random() * postTime);
    document.getElementById("postComment1Hours").innerHTML = commentTime;
    document.getElementById("postComment2Hours").innerHTML = Math.floor(Math.random() * commentTime);
    document.getElementById("postComment3Hours").innerHTML = Math.floor(Math.random() * postTime);

    document.getElementById("displayTitle").innerHTML = generateSentences(dictionary_reddit_title, 1, 1);
    document.getElementById("displayPost").innerHTML = generateSentences(dictionary_reddit_post, 3, 5);
    document.getElementById("displayComment1").innerHTML = generateSentences(dictionary_reddit_comment, 1, 2);
    document.getElementById("displayComment2").innerHTML = generateSentences(dictionary_reddit_comment, 1, 2);
    document.getElementById("displayComment3").innerHTML = generateSentences(dictionary_reddit_comment, 1, 2);

}

generate()



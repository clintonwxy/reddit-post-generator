library(dplyr)
library(RedditExtractoR)
library(purrr)
library(stringr)
library(tidytext)
library(jsonlite)
library(tidyr)

urls <- readxl::read_excel("data/top100reddit.xlsx")
data = map(urls, reddit_content)


# 1. Title

titles = data$url$title %>% 
  unique() %>%
  data.frame(titles = .,
             stringsAsFactors = FALSE)

titles %>%
  mutate(titles = paste0(titles, ".")) %>%
  unnest_tokens(output = sentence, input = titles, 
                token = "sentences", strip_punct = TRUE) %>%
  mutate(first = str_extract(sentence, pattern = "^[A-z]+\\s[A-z]+")) %>%
  select(first) %>%
  filter(!is.na(first)) %>%
  c(.) %>% 
  toJSON()

titles %>%
  mutate(titles = paste0(titles, ".")) %>%
  unnest_tokens(output = sentence, input = titles,
                token = "sentences", strip_punct = TRUE) %>%
  mutate(sentence = paste(sentence, "endend")) %>%
  unnest_tokens(words, sentence, token = "ngrams", n = 3) %>%
  separate(words, into = c("word1", "word2", "word3")) %>%
  filter(word1 != "endend" & word2 != "endend") %>%
  split(f = .$word1) %>%
  map(., function(x) {x[,c("word2", "word3")]}) %>%
  map(., function(x) {split(x, x["word2"])}) %>%
  map(., function(x) {map(x, function(y) {y$word3})}) %>%
  toJSON()

# 2. Posts

posts = data$url$post_text %>% 
  unique() %>%
  data.frame(posts = .,
             stringsAsFactors = FALSE)

posts %>% 
  mutate(id = 1:NROW(posts)) %>% 
  unnest_tokens(post, posts, token = "sentences") %>% 
  group_by(id) %>% 
  summarise(count = n()) %>% 
  summary()

posts %>%
  unnest_tokens(output = sentence, input = posts, 
                token = "sentences", strip_punct = TRUE) %>%
  mutate(first = str_extract(sentence, pattern = "^[A-z]+\\s[A-z]+")) %>%
  select(first) %>%
  filter(!is.na(first)) %>%
  c(.) %>% 
  toJSON()

posts %>%
  unnest_tokens(output = sentence, input = posts, 
                token = "sentences", strip_punct = TRUE) %>%
  mutate(sentence = paste(sentence, "endend")) %>%
  unnest_tokens(words, sentence, token = "ngrams", n = 3) %>%
  separate(words, into = c("word1", "word2", "word3")) %>%
  filter(word1 != "endend" & word2 != "endend") %>%
  split(f = .$word1) %>%
  map(., function(x) {x[,c("word2", "word3")]}) %>%
  map(., function(x) {split(x, x["word2"])}) %>%
  map(., function(x) {map(x, function(y) {y$word3})}) %>%
  toJSON()

# 3. Comments

comments = data$url$comment %>% 
  unique() %>%
  data.frame(comments = .,
             stringsAsFactors = FALSE)

comments %>% 
  mutate(id = 1:NROW(comments)) %>% 
  unnest_tokens(comment, comments, token = "sentences") %>% 
  group_by(id) %>% 
  summarise(count = n()) %>% 
  summary()

# 1 or 2 sentences

comments %>%
  unnest_tokens(output = sentence, input = comments, 
                token = "sentences", strip_punct = TRUE) %>%
  mutate(first = str_extract(sentence, pattern = "^[A-z]+\\s[A-z]+")) %>%
  select(first) %>%
  filter(!is.na(first)) %>%
  c(.) %>% 
  toJSON()

comments %>%
  unnest_tokens(output = sentence, input = comments, 
                token = "sentences", strip_punct = TRUE) %>%
  mutate(sentence = paste(sentence, "endend")) %>%
  unnest_tokens(words, sentence, token = "ngrams", n = 3) %>%
  separate(words, into = c("word1", "word2", "word3")) %>%
  filter(word1 != "endend" & word2 != "endend") %>%
  split(f = .$word1) %>%
  map(., function(x) {x[,c("word2", "word3")]}) %>%
  map(., function(x) {split(x, x["word2"])}) %>%
  map(., function(x) {map(x, function(y) {y$word3})}) %>%
  toJSON()




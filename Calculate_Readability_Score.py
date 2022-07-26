# Import OS utility library for file manipulation.
import os
# Import Path utility library for directory crawling.
from pathlib import Path
# Import readability scoring library.
import textstat

# Config variable for which directory to scan for text files to score.
text_files_dir = './output'
# Config variable for which directory to store scores in.
scores_dir = str(Path.home()) + '/scores'
# Config variable for scores file name.
scores_file_name = 'Scores.txt'

# Creating the scores file.
with open(os.path.join(scores_dir, scores_file_name), 'w') as scores_file:
  scores_file.write('**Flesch Reading Ease** scores for changed documents: \n')

# Find all text files to be scored.
for text_file_path in Path(text_files_dir).rglob('*.txt'):
  # Read text to be scored from test file.
  with open(text_file_path, 'r') as text_file:
    text = text_file.read()
  # Score text.
  score = textstat.flesch_reading_ease(text)
  # Write score to file.
  with open(os.path.join(scores_dir, scores_file_name), 'a') as scores_file:
    text_file_path_without_extension = str(text_file_path).replace('.txt', '')
    text_file_path_without_extension_and_without_prefix_path = text_file_path_without_extension.replace('output/','')
    scores_file.write('- **' + str(text_file_path_without_extension_and_without_prefix_path) + '**: ' + str(score) + '\n')

# Include a reference table for Flesch Reading Ease score.
with open(os.path.join(scores_dir, scores_file_name), 'a') as scores_file:
  scores_file.writelines(['\n', 'The following table can be helpful in assessing the readability score of a document.\n', '\n', 
    '''| Score |    Difficulty     |
  |-------|-------------------|
  |90-100 | Very Easy         |
  | 80-89 | Easy              |
  | 70-79 | Fairly Easy       |
  | 60-69 | Medium            |
  | 50-59 | Fairly Hard       |
  | 30-49 | Hard              |
  | 0-29  | Very Hard         |''' , '\n', '\n'])

import textwrap
import os
import google.generativeai as genai
from .. import load_dotenv
from IPython.display import display
from IPython.display import Markdown

def to_markdown(text):
  text = text.replace('•', '  *')
  return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))


GOOGLE_API_KEY= os.getenv('GOOGLE_API_KEY')
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('tunedModels/bloodnearme-eydyc5t46e82')


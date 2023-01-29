# import json
import openai
openai.api_key = "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"

# training_file = ".\\data_processing\\train_data_with_context.jsonl"
# training_prompts = []

# with open(training_file) as qa:
#     for line in qa.readlines():
#         training_prompts.append(json.loads(line))
# print(training_prompts[25]["prompt"])
import get_sim
model = "ada:ft-university-of-toronto-2023-01-29-06-16-22"
def clean_response(response):
    text = response["choices"][0]['text']
    text1 = text[:text.find('###')]
    text2 = text[:text.find('###')+3]
    return text1, text2
while True:
    question = input("what is your question?\n")
    prompt = get_sim.create_prompt(question)
    
    response =  openai.Completion.create(
            model=model,
            prompt=prompt,
            max_tokens=256,
            temperature=0
            )
    print(clean_response(response))
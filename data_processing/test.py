# import json

# training_file = ".\\data_processing\\train_data_with_context.jsonl"
# training_prompts = []

# with open(training_file) as qa:
#     for line in qa.readlines():
#         training_prompts.append(json.loads(line))
# print(training_prompts[25]["prompt"])
import get_sim

while True:
    question = input("what is your question?\n")
    prompt = get_sim.create_prompt(question)
    
    print(prompt)
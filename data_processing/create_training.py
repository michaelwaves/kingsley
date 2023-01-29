import re
import json
import get_sim





    
qa_file = ".\\data_processing\\train_data.jsonl"
training_file = ".\\data_processing\\train_data_with_context.jsonl"
training_qa = []

with open(qa_file) as qa:
    for line in qa.readlines():
        training_qa.append(json.loads(line))
training_data = []
training_data_str = ""







for qa in training_qa:
    print(qa["prompt"].split("\n")[0])

    prompt, texts, pages = get_sim.create_prompt(qa["prompt"].split("\n")[0])
    tqa = {"prompt": prompt, "completion": " "+qa["completion"]}
    training_data.append(tqa)
    training_data_str = training_data_str + json.dumps(tqa) + "\n"
with open(training_file, "w+") as f:
    f.write(training_data_str)

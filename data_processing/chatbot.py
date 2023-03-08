import get_sim
import openai
import json
import os
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")
# "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"
# model = "ada:ft-university-of-toronto-2023-01-29-00-52-11"
model = "ada:ft-university-of-toronto-2023-01-29-06-16-22"


def clean_response(response):
    text = response["choices"][0]['text']
    text1 = text[:text.find('###')]
    text2 = text[:text.find('###')+3]
    return text1, text2


def ask(question):
    max_words = 1400
    while max_words > 500:
        try:
            prompt, texts, pages = get_sim.create_prompt(question, max_words)
            response = openai.Completion.create(
                model=model,
                prompt=prompt,
                max_tokens=256,
                temperature=1
            )
            answer, raw_answer = clean_response(response)
            output = {
                "answer": answer,
                "top_links": pages
            }
            return output, prompt, raw_answer
        except:
            max_words -= 100
    output = {
        "answer": "failed, try again",
        "top_links": []
    }
    return output, "", ""


if __name__ == "__main__":
    training_file = ".\\data_processing\\train_data_with_context2.jsonl"
    training_data_str = ""
    while True:
        output, prompt, raw_answer = ask(input("ask: "))
        print(output["answer"])
        good = (input("was this answer satysfactory?(y/n): ") == "y")
        if good:
            tqa = {"prompt": prompt, "completion": raw_answer}
            training_data_str = training_data_str + json.dumps(tqa) + "\n"

        for link in output["top_links"][:1]:
            print("top: "+link)
        # for link in output["chatbot_links"]:
        #     print("chb: "+link)
        # print(f'\nverify at: {output["top_links"][0]}\n')
        # print(f'\nor at: {output["chatbot_links"][0]}\n')

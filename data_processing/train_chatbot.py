import openai
openai.api_key = "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"

send_file = False
file = "file-ZawRwu9JxPqW6NbyNfLKZyAj"
# Upload the file to OpenAI
if send_file:
    openai.File.create(
    file=open(".\\data_processing\\train_data_with_context.jsonl", "rb"),
    purpose='fine-tune'
    )
else:
    # Get the file id from https://api.openai.com/v1/files
    openai.FineTune.create(training_file=file, model="ada")

    #Check fine-tuning status
    print([model for model in openai.Model.list()["data"] if model["root"] == "ada:2020-05-03"])
    #print([model for model in openai.Model.list() if model[1]["root"].find("ada") != -1])

    #Try a prompt

from transformers import BertTokenizerFast, GPT2LMHeadModel
import torch
import re

def write_lyrics(genre):
    path = "app/model/write_lyrics_model"

    # 모델 불러오기
    model = GPT2LMHeadModel.from_pretrained(path)
    tokenizer = BertTokenizerFast.from_pretrained(path)

    # 모델 작동 환경 설정
    device = torch.device("cpu")
    model.cpu()

    def model_test(msg):
        # eval 모드로 설정
        model.eval()
        prompt = msg
        input_ids = torch.tensor(tokenizer.encode(f"<|startoftext|> {prompt} ")[1:]).unsqueeze(0).to(device='cpu', non_blocking=True)
        #input_ids = tokenizer.encode(prompt, return_tensors='pt').to(device='cpu', non_blocking=True)
        generate_ids = model.generate(
                                      input_ids,
                                      do_sample=True,
                                      top_k=50,
                                      min_length = 400,
                                      max_length = 892,
                                      top_p=0.92,
                                      num_return_sequences=1,
                                      no_repeat_ngram_size=3,
                                      temperature=0.9,
                                      repetition_penalty=1.5,
                                      pad_token_id=tokenizer.pad_token_id,
                                      eos_token_id=tokenizer.eos_token_id,
                                      bos_token_id=tokenizer.bos_token_id,
                                      use_cache=True
                                    ).to(device='cpu', non_blocking=True)

        for i, generated in enumerate(generate_ids):
            gen = "{}: {}".format(i, tokenizer.decode(generated, skip_special_tokens=True))
            gen = re.sub(r"<br>", "\n", gen)
            idx = gen.index('\n')
            gen = gen[(idx + 2)::]
            return gen

    prompt = f"<{genre}>"
    return model_test(prompt)
# Back-end Entry Level Challenge

Olá!

Ficamos MUITO felizes por você estar participando do nosso processo! Agora nós queremos conhecer um pouco melhor seu estilo de código, e principalmente sua capacidade de aprendizagem. Esperamos que curta o desafio!

## API de prontuário eletrônico

Você deverá implementar uma API REST HTTP (JSON) de um prontuário eletrônico. Essa API terá dois endpoints, um para cadastro de informações de saúde e outra para consulta delas.

## Cadastro de informações de saúde (POST)

Esse endpoint aceitará uma requisição com método POST com uma lista de informações de saúde a serem cadastradas. A resposta será a mesma lista enviada na requisição, mas com os IDs dos itens preenchidos.

**POST** `/{person_id}/clinical_backgrounds`

*Request*
```javascript
{
    "clinical_backgrounds": [
        {
            "type": "DISEASE", // Opções são: DISEASE, SURGICAL, VACCINE e MEDICINE
            "value": "Influenza", // Campo descriptivo da informação de saúde (ver opções de valores para cada tipo na seção de regras ao final)
            "created_at": "2021-03-03T09:55:00" // Data em formato ISO-8601
        }
    ]
}
```

*Response*
```javascript
{
    "clinical_backgrounds": [
        {
            "id": "ed2335dc-79bc-4408-ab3c-bdf92c03df49", // UUID aleatório gerado do registro criado
            "person_id": "57d4e5ce-d122-48f1-9a05-256b514f6da8", // UUID da pessoa enviado na query string
            "type": "DISEASE", // Opções são: DISEASE, SURGICAL, VACCINE e MEDICINE
            "value": "Influenza", // Campo descriptivo da informação de saúde (ver opções de valores para cada tipo na seção de regras ao final)
            "created_at": "2021-03-03T09:55:00" // Data em formato ISO-8601
        }
    ]
}
```

## Busca de informações de saúde (GET)

Esse endpoint aceitará uma requisição com método GET, recebendo na query string o `person_id` a ter seus registros de saúde buscados. A resposta será a lista de registros de saúde cadastradas da pessoa buscada.

**GET** `/{person_id}/clinical_backgrounds`

*Request*
```javascript
EMPTY
```

*Response*
```javascript
{
    "clinical_backgrounds": [
        {
            "id": "ed2335dc-79bc-4408-ab3c-bdf92c03df49", // UUID aleatório gerado do registro criado
            "person_id": "57d4e5ce-d122-48f1-9a05-256b514f6da8", // UUID
            "type": "DISEASE", // Opções são: DISEASE, SURGICAL, VACCINE e MEDICINE
            "value": "Influenza", // Campo descriptivo da informação de saúde (ver opções de valores para cada tipo na seção de regras ao final)
            "created_at": "2021-03-03T09:55:00" // Data em formato ISO-8601
        }
    ]
}
```

## Regras

Durante o processamento da requisição, as seguintes regras devem ser aplicadas:

### Regra #1 - Opções de valores para cada tipo de 

Em construção

## O que vamos avaliar?

- Documentação e arquivo README sobre o projeto, as tecnologias utilizadas e como subir e executar sua API, bem como os testes
- Testes de qualidade (bons testes são melhores do que muitos testes, então não se preocupe em tentar atingir 100% de cobertura)
- Qualidade do código: idiomático, aderente a comunidade/padrões/guias de estilo e de fácil leitura e manutenção
- Validação das regras
- Tratamento de erros

## Não precisa se preocupar:

- Não é necessário se preocupar com banco de dados. Está tudo bem usar estruturas de armazenamento em memória como listas (mas se quiser utilizar um banco de dados, será considerado um bom adendo :))
- Fique à vontade em escolher a linguagem e framework de sua preferência

## Dúvidas

Fique totalmente à vontade para nos fazer qualquer pergunta ou tirar qualquer dúvida que possa surgir no meio do caminho. Estamos aqui pra ajudar ☺️

Bom desafio!

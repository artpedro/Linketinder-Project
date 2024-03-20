"use strict";
class fieldChecker {
    constructor() {
    }
    static checkField(type, userInput) {
        // Expressão regular que sempre retorna falso
        let pattern = /[^\S\s]+/;
        let capitalName = RegExp('[A-ZÀ-Ú\'][a-zà-ú\']');
        switch (type) {
            case 'name':
                // Permite palavras capitalizadas espaçadas com - ou espaço comum
                pattern = RegExp(`/^(${capitalName}+((-${capitalName}+)+)? ?)+$/`);
                break;
            case 'email':
                // Permite emails com -. e letras com dois sufixos de tamanhos limitados espaçados por pontos
                pattern = /^[a-z]+(([\.-]+)?[a-z]+)*@[a-z]+\.[a-z]{2,6}(\.[a-z]{2})?/;
                break;
            case 'password':
                // Permite senhas de 6 a 20 digitos, com, pelo menos, 1 letra minuscula, 1 letra maiuscula, 1 dígito e 1 caractere especial
                pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%!^&*]).{6,20}$/;
                break;
            case 'telephone':
                // Requer um DDD mas é opcional adicionar parenteses, espaços, hífen e um número a mais no início
                pattern = /^\(?\d{2}\)?[\s-]?\d?\d{4}-?\d{4}$/;
                break;
            case 'cep':
                // Requer oito digitos com ou sem hífen
                pattern = /^\d{5}-?\d{3}$/;
                break;
            case 'country':
                // Semelhante ao nome
                pattern = RegExp(`/^(${capitalName}+((-${capitalName}+)+)? ?)+$/`);
                break;
            case 'cpf':
                // Permite CPF espaçado com . e - OU apenas numéricos
                pattern = /^(\d{3}\.){2}\d{3}-\d{2}$|^\d{11}$/;
                break;
            case 'cnpj':
                // Permite CNPJ espaçado com ., - e / OU apenas numéricos
                pattern = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$|^\d{14}$/;
                break;
            case 'desc':
                // A descricao deve ser breve e objetiva, nao pode utilizar espaços duplos 
                pattern = /[A-ZÀ-Ú\'a-zà-ú\!\?\.",\d]+ ?)+`/;
            default:
                return false;
        }
        return pattern.test(userInput);
    }
}

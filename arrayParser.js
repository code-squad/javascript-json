const tokenizer = require("./arrayTokenizer.js");

class arrayParser {
    constructor(tokens) {
        this.tokens = tokens;
        this.current = 0;
        this.quene = [];  
    }

    check_Balanced_Bracket() {
        let openBracket = 0
        let closedBracket = 0;
        this.tokens.forEach(element => {
            if(element.type === 'array' && element.value === '[') {
                openBracket++;
            }

            if(element.type === 'array' && element.value == ']') {
                closedBracket++;
            }
        });

        if(openBracket === closedBracket) {
            return true;
        } 
        else {
            throw new Error("입력된 값의 대괄호 짝이 맞지않습니다!")
        }
    }


    Lexical_Analysis_And_Array_Parsing() {
        // Lexical Analysis starts here
        let token = this.tokens[this.current];
        if(token.type === 'number') {
            this.current++;
            return {
                type: 'number',
                value: token.value,
                child: []
            }
        }

        if(token.type === 'string') {
            this.current++;
            return {
                type: 'string',
                value: token.value,
                child: []
            }
        }       

        if(token.type === 'boolean') {
            this.current++;
            return {
                type: 'boolean',
                value: token.value,
                child: []
            }
        }        

        if(token.type === 'null') {
            this.current++;
            return {
                type: 'null',
                value: token.value,
                child: []
            }
        }    
        
        // ArrayParsing starts here
        
        if((token.type === 'array' && token.value === '[')) {
                    this.current++;
                    token = this.tokens[this.current];  
                    
                    let node = {
                        type: "array",
                        child: [],
                    }
                    
                    while((token.type !== 'array') || (token.type === 'array' && token.value !== ']')) {
                        node.child.push(this.Lexical_Analysis_And_Array_Parsing());
                        token = this.tokens[this.current];
                    }
                    
                    this.quene.push(node);
                    return node;
                }                
            
        if((token.type === 'array' && token.value === "]")) {
            
            this.current++  
            token = this.tokens[this.current];

            if(this.quene.length > 1) {
                const first_Quene_Element = 0;
                let child_Of_ShfitedQuene = this.quene[first_Quene_Element].child;
                this.quene.shift();   
                let Is_Array_In_CurrentQuene = this.quene[first_Quene_Element].child[this.quene[first_Quene_Element].child.length - 1].type;
                    
                if(Is_Array_In_CurrentQuene === 'array') {
                        this.quene[first_Quene_Element].child[this.quene[first_Quene_Element].child.length - 1].child = [child_Of_ShfitedQuene];                            
                    }

                while((token.type !== 'array') || (token.type === 'array' && token.value !== "]")) {
                        this.quene[first_Quene_Element].child.push(this.Lexical_Analysis_And_Array_Parsing());
                        token = this.tokens[this.current]; 
                }

                this.Lexical_Analysis_And_Array_Parsing();
            }
            
            if(this.current < this.tokens.length) {
            while((token.type !== 'array') || (token.type === 'array' && token.value !== "]")) {
                this.quene[0].child.push(this.Lexical_Analysis_And_Array_Parsing());
            }
        }

            return this.quene
        }
                
    }
     
    executor() {
        let return_In_Sequence = [];
                                
        while(this.current < this.tokens.length) {
            return_In_Sequence.push(this.Lexical_Analysis_And_Array_Parsing());
        }

        let the_Most_recent_updated_value = return_In_Sequence[return_In_Sequence.length - 1];

        const get_Child_Of_the_Most_recent_updated_Value = 0; 
        return the_Most_recent_updated_value[get_Child_Of_the_Most_recent_updated_Value];
    }

}

module.exports = arrayParser;


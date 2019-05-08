class arrayParser {
    constructor(tokens) {
        this.tokens = tokens;
        this.current = 0;
        this.quene = [];  
    }
    Lexical_Analysis_And_Array_Parsing() {
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
                    // node를 갱신시키기위해서, quene에 현재 node를 넣고 return
                    return node;
                }                
            
        if((token.type === 'array' && token.value === "]")) {
            
            this.current++  
            token = this.tokens[this.current];
            const minLength = 1;

            if(this.quene.length > minLength) {
                const first_Quene_Element = 0;
                let child_Of_ShfitedQuene = this.quene[first_Quene_Element].child;

                this.quene.shift();   
                
                let Is_Array_In_CurrentQuene = this.quene[first_Quene_Element].child[this.quene[first_Quene_Element].child.length - 1].type;
                
                // 'array'가 child의 property로 있다는 것은 array child안에 nested array 방식으로 다른 값이 있기 때문에, 이전에 갱신된 값을 갱신되기 전 값을 가지고 있는 child의 부모항목의 quene에 = 을 이용해 할당해준다.

                // 그리고 IS_Array_In_CurrentQuene 값을 child 항목의 제일 마지막 index로 준 이유는 [1,1,[2, 와 같이 array가 있다면 무조건 제일 마지막에 있어야 nested array가 발생할 수 있기 때문이다.
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
                const current_Quene_index = 0;
                this.quene[current_Quene_index].child.push(this.Lexical_Analysis_And_Array_Parsing());
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


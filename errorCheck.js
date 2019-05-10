
class ErrorCheck {
      
      check_improper_String(input, currentIndex) {
        let current = currentIndex;
        while(true) {
          currentIndex--;
          if(input[currentIndex] === '[' || input[currentIndex] === ',') {
              return this.print_improper_String(input, (currentIndex + 1), current);
          }
        }
      }

      print_improper_String(input, index, current) {
        let merged_string = '';
        for(let i = index; i <= current; i++) {
          merged_string += input[i];
        }

        return merged_string;
        } 

      check_Double_dash_and_dot(val) {
        let number_checker = []
        number_checker = val;
        let dot_counter = 0;
        let dash_counter = 0;

        for(let i = 0; i < val.length; i++) {
            if(number_checker[i] === ".") {
                dot_counter++;
            } 
            else if(number_checker[i] === '-') {
                dash_counter++;
            }
        }

        if(dot_counter === 2 || dash_counter === 2) {
            return false;
        }

        return true;
      }

      check_Balanced_Bracket(tokens) {
        let openBracket = 0
        let closedBracket = 0;
        tokens.forEach(element => {
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

}

module.exports = ErrorCheck

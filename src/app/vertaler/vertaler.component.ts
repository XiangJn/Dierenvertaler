import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vertaler',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './vertaler.component.html',
  styleUrl: './vertaler.component.scss'
})
export class VertalerComponent {
  translate: string = "";
  translateOg: string = "taal";
  translateTo: string = "labrador";
  translation: string = "";
  drunk = false
  wrongInput = "Input komt niet overeen met geselecteerde taal."
  cnr = "Taal kon niet automatisch worden herkend"
  words = this.translate.split(' ');
  options: { value: string, text: string }[] = [];
  punctuations = /[.!?]/;

  //change the select translateTo
  changeSelect(): void {
    switch (this.translateOg) {
      case 'mens':
        this.options = [
          { value: 'labrador', text: 'Labrador' },
          { value: 'poedel', text: 'Poedel' },
          { value: 'parkiet', text: 'Parkiet' },
          { value: 'papegaai', text: 'Papegaai' }
        ];
        this.loadSelect()
        return;
      case 'labrador':
        this.options = [
          { value: 'poedel', text: 'Poedel' },
          { value: 'papegaai', text: 'Papegaai' },
        ];
        this.loadSelect()
        return;
      case 'poedel':
        this.options = [
          { value: 'labrador', text: 'labrador' },
          { value: 'papegaai', text: 'Papegaai' },
        ];
        this.loadSelect()
        return;
      case 'parkiet':
        this.options = [
          { value: 'papegaai', text: 'Papegaai' },
        ];
        this.loadSelect()
        return;


    }
  }
  //load the select with the options from the specific category
  loadSelect(): void {
    const selectTranslateTo = document.getElementById('translateTo') as HTMLSelectElement;
    selectTranslateTo.innerHTML = '';
    this.options.forEach(option => {
      const newOption = document.createElement('option');
      newOption.value = option.value;
      newOption.text = option.text;
      selectTranslateTo.add(newOption)
    });
    this.translateTo = selectTranslateTo.value
  }


  onSubmit(): void {
    this.translation = ""
    this.words = this.translate.split(' ');
    this.words = this.words.filter(str => str.trim() !== '');
    var rightSelect = true
    //clears the styling of the translation
    var styleTrans = document.getElementById('translation')
    if (styleTrans) {
      while (styleTrans.classList.length > 0) {
        styleTrans.classList.remove(styleTrans.classList.item(0)!);
      }
    }
    //checks which language is selected
    switch (this.translateOg) {
      case 'labrador':
        this.words.forEach((word) => {
          if (word.toLowerCase() != "woef") {
            rightSelect = false
          }
        })
        if (rightSelect == true) {
          this.translateText()
        } else {
          this.translateForm(this.wrongInput)
        }
        return;
      case 'poedel':
        this.words.forEach((word) => {
          if (word.toLowerCase() != "woefie") {
            rightSelect = false
          }
        })
        if (rightSelect == true) {
          this.translateText()
        } else {
          this.translateForm(this.wrongInput)
        }
        return;
      case 'parkiet':
        this.words.forEach((word) => {
          if (word.toLowerCase() != "tjilp" && word.toLowerCase() != "piep") {
            rightSelect = false
          }
        })
        if (rightSelect == true) {
          this.translateText()
        } else {
          this.translateForm(this.wrongInput)
        }
        return;
      case 'taal':
        this.recognizeL()
        return;
      default:
        this.translateText()
        if (this.drunk) {
          this.drunkMode()
        }
    }
  }
  //search the language which is being inputted
  recognizeL(): void {
    var labrador = true
    var poedel = true
    var parkiet = true
    this.words.forEach((word) => {
      if (word.toLowerCase() != "woef") {
        labrador = false
      }
      if (word.toLowerCase() != "woefie") {
        poedel = false
      }
      if (word.toLowerCase() != "tjilp" && word.toLowerCase() != "piep") {
        parkiet = false
      }
    })
    if (labrador) {
      if (poedel) {
        if (parkiet) {
          this.translation = this.cnr
          return
        }
        this.translation = this.cnr
        return
      }
      this.translateOg = "labrador"
      this.changeSelect()
      this.translateText()
      if (this.drunk) {
        this.drunkMode()
      }
      return
    }
    if (poedel) {
      if (labrador) {
        if (parkiet) {
          this.translation = this.cnr
          return
        }
        this.translation = this.cnr
        return
      }
      this.translateOg = "poedel"
      this.changeSelect()
      this.translateText()
      if (this.drunk) {
        this.drunkMode()
      }
      return
    }
    if (parkiet) {
      if (labrador) {
        if (poedel) {
          this.translation = this.cnr
          return
        }
        this.translation = this.cnr
        return
      }
      this.translateOg = "parkiet"
      this.changeSelect()
      this.translateText()
      if (this.drunk) {
        this.drunkMode()
      }
      return
    }
    this.translateForm(this.cnr)
  }
  //translate the input to the right output
  translateText(): void {
    this.words = this.words.filter(str => str.trim() !== '');
    switch (this.translateTo) {
      case 'labrador':
        //adding the style for the specific case
        document.getElementById('translation')?.classList.add('labrador')
        this.words.forEach((word) => {
          if (this.punctuations.test(word.slice(-1))) {
            this.translateForm("woef" + word.slice(-1) + " ")
          } else {
            this.translateForm("woef ")
          }
        })
        if (this.drunk) {
          this.drunkMode()
        }
        return;
      case 'poedel':
        document.getElementById('translation')?.classList.add('poedel')
        this.words.forEach((word) => {
          if (this.punctuations.test(word.slice(-1))) {
            this.translateForm("woefie" + word.slice(-1) + " ")
          } else {
            this.translateForm("woefie ")
          }
        })
        if (this.drunk) {
          this.drunkMode()
        }
        return;
      case 'parkiet':
        document.getElementById('translation')?.classList.add('parkiet')
        this.words.forEach((word) => {
          if (/^[aeiouAEIOU]/.test(word)) {
            if (this.punctuations.test(word.slice(-1))) {
              // this.translation += ('<span>tjilp</span>' + word.slice(-1) + " ")
              this.translateForm("tjilp" + word.slice(-1) + " ")
            } else {
              // this.translation += ('<span>tjilp</span>')
              this.translateForm("tjilp ")
            }
          } else {
            if (this.punctuations.test(word.slice(-1))) {
              this.translateForm("piep" + word.slice(-1) + " ")
            } else {
              this.translateForm("piep ")
            }
          }
        })
        if (this.drunk) {
          this.drunkMode()
        }
        return;
      case 'papegaai':
        document.getElementById('translation')?.classList.add('papegaai')
        this.translation = "Ik praat je na: "
        this.words.forEach((word) => {
          if (this.punctuations.test(word)) {
            this.translateForm(word)
            this.translation += "<br> Ik praat je na: "
          } else {
            this.translateForm(word + " ")
          }
        })
        if (this.drunk) {
          this.drunkMode()
        }
        return;

    }

  }

  translateForm(sound: string): void {
    this.translation += sound
    this.translationShow()

  }
  //applies the drunk mode
  drunkMode(): void {
    console.log("check")
    var counter = 1
    var words = this.translation.split(' ');
    words = words.filter(str => str.trim() !== '');
    var temp = ""
    console.log(words)
    words.forEach((word) => {
      if (counter % 4 != 0) {
        if (this.punctuations.test(word)) {
          if (words.length / (counter) != 1) {
            temp += "Proost! "
          } else {
            temp += word + " "
          }
        } else {
          temp += word + " "
        }
      } else {
        if (this.punctuations.test(word)) {
          temp += word.split('').reverse().join('') + " "
          if (words.length / (counter) != 1) {
            temp += "Proost! "
          }
        } else {
          temp += word.split('').reverse().join('') + " "
        }
      }
      counter++

    })
    this.translation = temp + "Burp!"
    this.translationShow()
  }

  //shows the translation
  translationShow(): void {
    const translation = document.getElementById('translation');
    if (translation) {
      translation.innerHTML = this.translation
    }
  }

}



import { Scene } from "phaser";

export class Credits extends Scene {
    constructor() {
      super("Credits");
    }
  
    create() {
  
      // texto de agradecimento ao professor
      this.text1 = this.add.text(100, 100, "Agradeceço ao professor pela dedicação e conhecimento compartilhados,\nalém da paciência com os meus atrasos.\n", { fontSize: '24px', fill: '#ffffff' });
  
      // texto de agradecimento à turma
      this.text2 = this.add.text(100, 150, "Esse foi um jogo que fiz na minha gradução espero que gostem.\nOs links dos materiais aqui usados estão no respositório do git hub.", { fontSize: '24px', fill: '#ffffff' });
  
      // Adicione um botão para voltar ao menu
      const backButton = this.add.text(100, 450, "<<Voltar para o Menu>>", { fontSize: '24px', fill: '#ffffff' });
      backButton.setInteractive();
      backButton.on('pointerdown', () => {
        this.scene.start("MainMenu");
      });
  
      // animações 
      this.input.on('gameobjectover', function (pointer, gameObject) {
        gameObject.setTintFill(0xcf70cf);
      });
      this.input.on('gameobjectout', function (pointer, gameObject) {
        gameObject.clearTint();
      });
  
      this.loadingAnimation = this.tweens.add({
        targets: [backButton],
        alpha: 0.5, // Esmace o texto
        duration: 1500, // Duração da animação em milissegungos
        ease: 'Sine.easeInOut', // Função de easing
        loop: -1, // Número de repetições do loop, -1 para indefinido
        yoyo: true // Efeito yoyo
      });
    }
  }
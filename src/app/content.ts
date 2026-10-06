export type Question = {prompt:string;answer:string;options:string[];explain:string;hint:string};
export const rand=(min:number,max:number)=>Math.floor(Math.random()*(max-min+1))+min;
export function shuffle<T>(values:T[]):T[]{const result=[...values];for(let i=result.length-1;i>0;i--){const j=rand(0,i);[result[i],result[j]]=[result[j],result[i]];}return result;}
function numeric(prompt:string,n:number,explain:string,hint:string):Question{const s=new Set([n]);while(s.size<4)s.add(Math.max(0,n+rand(-Math.max(5,Math.ceil(n/3)),Math.max(5,Math.ceil(n/3)))));return{prompt,answer:String(n),options:shuffle([...s].map(String)),explain,hint};}
export function math(age:number):Question{
 if(age===0){const a=rand(1,9),b=rand(1,9);return numeric(`${a} + ${b} = ?`,a+b,`Juntando ${a} com ${b}, temos ${a+b}.`,`${'● '.repeat(a)} + ${'● '.repeat(b)} Conte os dois grupos.`);}
 if(age===1){const a=rand(2,12),b=rand(2,10);return numeric(`${a} × ${b} = ?`,a*b,`${a} grupos de ${b} formam ${a*b}.`,`Some ${b} um total de ${a} vezes.`);}
 if(age===2){const b=rand(2,12),n=rand(3,15);return numeric(`${b*n} ÷ ${b} = ?`,n,`${n} × ${b} = ${b*n}. Multiplicação e divisão são operações inversas.`,`Qual número multiplicado por ${b} dá ${b*n}?`);}
 const x=rand(2,20),a=rand(2,8),b=rand(1,20);return numeric(`${a}x + ${b} = ${a*x+b}. Quanto vale x?`,x,`Subtraia ${b} dos dois lados: ${a}x = ${a*x}. Divida por ${a}: x = ${x}.`,`Primeiro desfaça a soma de ${b}. Depois divida por ${a}.`);
}
export function logic(age:number):Question{
 const start=rand(1,9),step=rand(1+age,4+age*3);
 if(age<2)return numeric(`${start}, ${start+step}, ${start+step*2}, ${start+step*3}, …`,start+step*4,`A regra é somar ${step} a cada passo.`,`Compare dois números vizinhos. Quanto aumentou?`);
 if(age===2){const n=rand(1,5),r=rand(2,3);return numeric(`${n}, ${n*r}, ${n*r*r}, ${n*r**3}, …`,n*r**4,`Cada número é multiplicado por ${r}.`,`Experimente multiplicar, em vez de somar.`);}
 const n=rand(1,6);return numeric(`${n*n}, ${(n+1)**2}, ${(n+2)**2}, ${(n+3)**2}, …`,(n+4)**2,`São quadrados consecutivos: ${n}², ${n+1}², ${n+2}², ${n+3}² e ${n+4}².`,`Pense em números multiplicados por eles mesmos.`);
}
export const words:[string,string][][]=[
 [["GATO","Animal que mia"],["BOLA","Rola e pula nas brincadeiras"],["CASA","Lugar onde podemos morar"],["PATO","Ave que faz quá-quá"],["SAPO","Pula e vive perto da água"],["LUA","Aparece no céu e orbita a Terra"],["SOL","A estrela mais próxima da Terra"],["MALA","Leva nossas roupas na viagem"],["VACA","Animal que faz muu"],["FOCA","Mamífero que nada muito bem"],["BOLO","Pode ter velinhas de aniversário"],["PIPA","Voa presa a uma linha"],["DADO","Tem pontos e seis faces"],["RATO","Pequeno roedor"],["UVA","Fruta que cresce em cachos"],["LAGO","Água cercada por terra"]],
 [["PLANETA","A Terra é um deles"],["FLORESTA","Lugar com muitas árvores"],["ESCOLA","Lugar de aprender com outras pessoas"],["JANELA","Deixa entrar luz e ar"],["ESTRELA","O Sol é uma delas"],["LIVRO","Uma história pode morar aqui"],["OCEANO","Grande porção de água salgada"],["AMIZADE","Laço de carinho entre amigos"],["SEMENTE","Pode dar origem a uma planta"],["FOGUETE","Veículo de viagens espaciais"],["ABELHA","Inseto polinizador"],["COELHO","Mamífero de orelhas compridas"],["CADERNO","Suas páginas recebem nossas ideias"],["PONTE","Liga dois lados sobre um obstáculo"],["CHUVA","Água que cai das nuvens"],["TEMPO","Medimos com relógios"]],
 [["ENERGIA","Capacidade de realizar trabalho ou causar mudanças"],["CULTURA","Costumes, saberes e expressões de um povo"],["PESQUISA","Investigação para descobrir algo"],["RESPEITO","Reconhecer o valor e os limites do outro"],["ALIMENTO","Fornece nutrientes para o corpo"],["AMBIENTE","Tudo que cerca os seres vivos"],["GRAVIDADE","Atração entre corpos com massa"],["UNIVERSO","Inclui espaço, tempo, matéria e energia"],["MEMBRANA","Envolve e regula a entrada e saída da célula"],["OXIGENIO","Gás usado na respiração humana"],["FRACAO","Representa partes de um todo"],["VERBO","Pode indicar ação, estado ou fenômeno"],["SUJEITO","Termo sobre o qual se declara algo na oração"],["VOLUME","Medida do espaço ocupado"],["HABITAT","Lugar onde uma espécie vive"],["FOSSIL","Vestígio preservado de vida do passado"]],
 [["ALGORITMO","Sequência de passos para resolver um problema"],["ECOSSISTEMA","Seres vivos e ambiente interagindo"],["ARGUMENTO","Razão que sustenta uma ideia"],["HIPOTESE","Explicação provisória que pode ser testada"],["DEMOCRACIA","Governo com participação do povo"],["METAFORA","Comparação implícita entre ideias"],["EVIDENCIA","Informação que ajuda a sustentar uma conclusão"],["VARIAVEL","Valor que pode mudar"],["AUTONOMIA","Capacidade de tomar decisões por si"],["DIVERSIDADE","Variedade de formas, ideias e identidades"],["SUSTENTAVEL","Que considera recursos e gerações futuras"],["PROBABILIDADE","Mede a chance de um evento"],["CROMOSSOMO","Estrutura celular que contém DNA"],["INERCIA","Tendência de manter repouso ou movimento uniforme"],["DENSIDADE","Relação entre massa e volume"],["CIDADANIA","Exercício de direitos e deveres na sociedade"]]
];
type Fact=[string,string,string,string,string,string];
const facts:Fact[][]=[
 [
 ["Qual parte da planta geralmente absorve água do solo?","Raiz","Flor","Fruto","Folha","As raízes absorvem água e sais minerais do solo."],
 ["Qual animal é um mamífero?","Gato","Borboleta","Sapo","Galinha","Gatos têm pelos e mamam quando filhotes."],
 ["O que usamos para ouvir?","Ouvidos","Olhos","Nariz","Mãos","Os ouvidos captam os sons ao nosso redor."],
 ["Qual destes é uma estrela?","Sol","Terra","Lua","Marte","O Sol produz sua própria luz."],
 ["O gelo é água em qual estado?","Sólido","Gasoso","Líquido","Nenhum","Quando congela, a água passa ao estado sólido."],
 ["Qual hábito ajuda a cuidar dos dentes?","Escovar os dentes","Comer só doces","Nunca beber água","Dormir com comida na boca","A escovação remove restos de comida e placa."],
 ["Qual animal passa por uma fase de lagarta?","Borboleta","Cachorro","Peixe","Pato","A lagarta se transforma em borboleta pela metamorfose."],
 ["O que uma planta usa na fotossíntese?","Luz","Plástico","Vidro","Areia apenas","A luz fornece energia para a planta produzir seu alimento."],
 ["Onde os peixes respiram o oxigênio dissolvido?","Na água","No fogo","Na areia seca","Nas pedras","As brânquias retiram oxigênio dissolvido na água."],
 ["Qual órgão bombeia sangue?","Coração","Estômago","Osso","Pele","O coração impulsiona o sangue pelo corpo."],
 ["Qual destes nasce de uma semente?","Feijoeiro","Pedra","Copo","Colher","A semente do feijão pode germinar e formar uma planta."],
 ["O que protege o corpo por fora?","Pele","Coração","Pulmão","Estômago","A pele é uma barreira que envolve o nosso corpo."]
 ],
 [
 ["Qual movimento da Terra causa dia e noite?","Rotação","Translação","Evaporação","Erosão","A Terra gira em torno de seu eixo, alternando a parte iluminada."],
 ["Na evaporação, a água líquida vira…","Vapor","Gelo","Rocha","Sal","Na evaporação, a água passa do estado líquido ao gasoso."],
 ["Quem produz seu próprio alimento pela fotossíntese?","Plantas","Gatos","Cogumelos","Pessoas","Plantas usam luz, água e gás carbônico na fotossíntese."],
 ["Qual material pode ser atraído por um ímã?","Ferro","Madeira","Papel","Vidro","O ferro é um material ferromagnético."],
 ["Qual órgão usamos principalmente para respirar?","Pulmões","Estômago","Rins","Intestino","Nos pulmões ocorrem trocas de gases com o sangue."],
 ["Como chamamos animais que comem plantas?","Herbívoros","Carnívoros","Minerais","Decompositores","Herbívoros se alimentam de plantas ou de partes delas."],
 ["Qual fonte de energia é renovável?","Sol","Petróleo","Carvão mineral","Gás natural","A energia solar se renova em escalas de tempo humanas."],
 ["Qual ação ajuda a reduzir o lixo?","Reutilizar embalagens","Jogar tudo no rio","Queimar plástico","Misturar todo resíduo","Reutilizar prolonga a vida de um objeto e reduz descartes."],
 ["A Lua é um…","Satélite natural","Cometa","Planeta","Sol","A Lua é o satélite natural da Terra."],
 ["Qual grupo costuma decompor matéria orgânica?","Fungos","Rochas","Nuvens","Metais","Muitos fungos decompõem matéria orgânica e reciclam nutrientes."],
 ["O som precisa de quê para se propagar?","Um meio material","Apenas luz","Vácuo total","Escuridão","O som se propaga por meios como ar, água e sólidos."],
 ["Qual parte do corpo sustenta e protege órgãos?","Esqueleto","Cabelo","Unhas","Suor","Os ossos dão sustentação e protegem órgãos como o cérebro."]
 ],
 [
 ["Qual é a unidade básica dos seres vivos?","Célula","Átomo apenas","Órgão","Tecido","Células constituem os seres vivos; tecidos são conjuntos de células."],
 ["Qual gás as plantas absorvem na fotossíntese?","Gás carbônico","Hélio","Hidrogênio","Neônio","Na fotossíntese, plantas usam CO₂ e água para produzir açúcares."],
 ["Água com sal totalmente dissolvido é uma mistura…","Homogênea","Heterogênea","Sempre sólida","De gases apenas","Uma solução de sal dissolvido em água apresenta uma única fase."],
 ["Qual força mantém os planetas em órbita?","Gravidade","Atrito","Força muscular","Empuxo","A gravidade atrai os planetas para o Sol."],
 ["Em uma cadeia alimentar, a planta é um…","Produtor","Consumidor primário","Consumidor secundário","Predador","Produtores fabricam matéria orgânica, em geral pela fotossíntese."],
 ["Qual órgão filtra o sangue e produz urina?","Rins","Pulmões","Estômago","Pâncreas","Os rins filtram o sangue e regulam água e sais no corpo."],
 ["A passagem de vapor para líquido se chama…","Condensação","Fusão","Sublimação","Solidificação","A condensação ocorre quando um gás passa ao estado líquido."],
 ["Qual material geralmente conduz bem eletricidade?","Cobre","Borracha","Vidro","Plástico","Metais como o cobre têm elétrons que se movimentam com facilidade."],
 ["A biodiversidade é a variedade de…","Formas de vida","Apenas árvores","Apenas climas","Tipos de plástico","Biodiversidade inclui diversidade genética, de espécies e ecossistemas."],
 ["Qual processo desgasta e transporta solo?","Erosão","Digestão","Fotossíntese","Respiração","Água e vento podem desgastar e transportar partículas do solo."],
 ["Qual sistema transporta sangue pelo corpo?","Circulatório","Digestório","Nervoso","Esquelético","Coração e vasos sanguíneos integram o sistema circulatório."],
 ["Uma alavanca é um exemplo de…","Máquina simples","Ser vivo","Reação química","Fonte de luz","Máquinas simples podem facilitar a aplicação de uma força."]
 ],
 [
 ["Se a massa é 60 g e o volume é 20 cm³, a densidade é…","3 g/cm³","40 g/cm³","1200 g/cm³","0,3 g/cm³","Densidade = massa ÷ volume. Logo, 60 ÷ 20 = 3 g/cm³."],
 ["Em um experimento controlado, convém mudar…","Uma variável por vez","Todas ao mesmo tempo","Nenhuma nunca","Só a conclusão","Mudar uma variável por vez ajuda a identificar seu efeito."],
 ["Uma solução com pH 3 é…","Ácida","Neutra","Básica","Sempre potável","Em condições usuais, pH abaixo de 7 indica acidez."],
 ["Qual molécula armazena informação genética?","DNA","Água","Gás carbônico","Cloreto de sódio","A sequência de bases do DNA contém informação genética."],
 ["A unidade de força no SI é…","Newton","Watt","Joule","Volt","Força se mede em newtons; watt mede potência e joule mede energia."],
 ["Um objeto tende a manter seu estado de movimento por…","Inércia","Evaporação","Digestão","Refração","A inércia é descrita pela primeira lei de Newton."],
 ["Ao entrar na água, a luz pode mudar de direção por…","Refração","Combustão","Fusão","Fermentação","A mudança de velocidade entre meios pode desviar a luz."],
 ["Na respiração celular, as células obtêm…","Energia utilizável","Luz solar","Som","Sal puro","A respiração celular transforma energia de nutrientes em formas utilizáveis, como ATP."],
 ["Uma relação de benefício mútuo entre espécies é…","Mutualismo","Predação","Parasitismo","Competição","No mutualismo, ambas as espécies se beneficiam."],
 ["A principal causa do aquecimento global recente é…","Aumento de gases de efeito estufa","Rotação da Lua","Diminuição da gravidade","Marés diárias","Atividades humanas aumentam gases que retêm calor na atmosfera."],
 ["Em um circuito, a resistência elétrica se mede em…","Ohms","Metros","Litros","Kelvins","A resistência é medida em ohms, representados por Ω."],
 ["Um resultado científico fica mais confiável quando…","Pode ser reproduzido","Não tem dados","Nunca é questionado","Depende só de opinião","A reprodução independente ajuda a avaliar a confiabilidade de um resultado."]
 ]
];
export function science(age:number,index:number):Question{const f=facts[age][index%facts[age].length];return{prompt:f[0],answer:f[1],options:shuffle(f.slice(1,5)),explain:f[5],hint:"Compare as alternativas e elimine as que não combinam com a pergunta."};}

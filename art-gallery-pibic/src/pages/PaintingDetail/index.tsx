import PaintingDescription from "../../components/PaintingDesciption";
import Engravings from "../../components/Engravings";
import { DetailContainer } from "./styles";
import teresa from "../../assets/teresa.jpeg";

const painting1 = {
  title: "Visão: a monja Teresa é protegida por Jesus",
  author: "João de Deus e Sepúlveda (Séc. XVIII)",
  tags: ["Teresa", "Jesus", "Pena", "Anjo", "Espada"],
  description:
    "Vi-me, estando em oração, sozinha num grande campo, e em redor de mim muita gente de modos diversos que me cercava. Todos, me parece, tinham armas nas mãos para me agredir: uns, lanças; outros, espadas; outros, adagas e outros, estoques muito compridos; enfim, eu não podia sair por nenhum lado sem me pôr em perigo de morte, e só, sem ninguém que se achasse do meu lado. Estando meu espírito nesta aflição, que não sabia que fazer de mim, levantei os olhos ao Céu e vi Cristo, não no Céu, mas bem por cima de mim, no ar, e me estendia a mão e de ali mesmo me favorecia, de maneira que eu não temia toda aquela outra gente; nem eles, embora quisessem, me podiam fazer dano",
  image: teresa,
};

const PaintingDetail = () => {
  return (
    <DetailContainer>
      <PaintingDescription
        title={painting1.title}
        desciption={painting1.description}
        tags={painting1.tags}
        church={painting1.author}
        image={painting1.image}
      />
      <Engravings />
    </DetailContainer>
  );
};
export default PaintingDetail;

# CGRA 2020/2021

## Group T05G03
| Name             | Number    | E-Mail             |
| ---------------- | --------- | ------------------ |
| Afonso Monteiro | 201907284 | up201907284@fe.up.pt |
| Mário Travassos | 201905871 | up201905871@fe.up.pt |

## Project Notes
Para que as funcionalidades principais funcionassem, foi necessário:

- Fazer com que o peixe largasse a pedra no ninho com o uso de outra tecla que não fosse o "C" (usou-se a tecla "T", no nosso caso). Ao implementar a funcionalidade na referida tecla, fazia com que o peixe "comesse" a pedra, ou seja, a pedra aparecia momentaneamente na boca do peixe, mas imediatamente desaparecia da cena. O uso de outra tecla resolveu esse problema.

- Limitar a capacidade de pedras que pudessem ser colocadas no ninho. Da forma como o ninho está implementada e para fazer a implementação bem sucedida do ponto extra 7.3, teve-se de estabelecer "à priori" uma capacidade para o ninho. Ao bater nesse limite, o peixe deixa de conseguir largar pedras no ninho, devendo-se dar "refresh" à pagina para que se possa voltar a fazer.

Além disso, implementou-se uma classe própria para o ninho. 
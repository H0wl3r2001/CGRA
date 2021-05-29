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

Dos pontos extras, o nosso grupo implementou com sucesso os pontos 7.1 e 7.3.

Além disso, implementou-se uma classe própria para o ninho. 

## Screenshots

### 1 - My Fish
![Screenshot 1] (screenshots/proj-t05g03-1.png)

### 2 - Sea Floor

![Screenshot 2] (screenshots/proj-t05g03-2.png)

### 3 - Water Map

![Screenshot 3] (screenshots/proj-t05g03-3.png)

### 4 - Rocks

![Screenshot 4] (screenshots/proj-t05g03-4.png)

### 5 - Pillars

![Screenshot 5] (screenshots/proj-t05g03-5.png)

### 6 - Extra map elements

![Screenshot 6] (screenshots/proj-t05g03-6.png)

### 7 - Fish movement (collect and dispose)

![Screenshot 7a] (screenshots/proj-t05g03-7a.png)
![Screenshot 7b] (screenshots/proj-t05g03-7b.png)
![Screenshot 7c] (screenshots/proj-t05g03-7c.png)

### 8 - Extras implemented (randomness in the Seaweed and rocks in the nest)

![Screenshot 8] (screenshots/proj-t05g03-8.png)

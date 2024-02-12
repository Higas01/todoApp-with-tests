import { fireEvent, render } from "@testing-library/react"
import Button from "./Button";
import ITask from "../../interface/ITask";

describe("<Buttton/>", () => {
    it("should call function with sucessfuly", () => {
        // Arrange
        const list: ITask[] = [];
        const mockFunction = jest.fn( value => {
            list.push(value);
        });
        const data = {
            id: 250,
            task: "Tarefa 1"
        }

      const {getByText} =  render(<Button background="green" handleClick={() => mockFunction(data)}>Adicionar</Button>)
      const button = getByText("Adicionar");  

        // Act
        fireEvent.click(button)

        //Assert
        expect(mockFunction).toHaveBeenCalled();
        expect(list).toHaveLength(1); 
        expect(list[0]).toEqual(data); 
  
    })
    
})
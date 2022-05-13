import { Form, Input, Button, Space, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import React from "react";
import styled from "styled-components";

enum value1Params {
  AAA = "AAA",
  BBB = "BBB",
  CCC = "CCC",
}
interface IState {
  value: number;
  value1Params: value1Params;
}
const Test = () => {
  const globalValueRef = React.useRef({
    AAA: 0,
    BBB: 0,
    CCC: 0,
  });
  const [formInstance] = Form.useForm();
  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };

  const getoneofCurrentFormValue = (itemNumber: number) => {
    const currentFormValue = formInstance.getFieldValue("testForm");
    let payload = currentFormValue[itemNumber];
    console.log(payload);
  };

  const value1ParamsSelection = ["AAA", "BBB", "CCC"];
  const [state, setState] = React.useState<IState>({
    value: 0,
    value1Params: value1Params.AAA,
  });
  const [uiState, setUiState] = React.useState<boolean>(false);

  return (
    <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off" form={formInstance}>
      <Form.List name="testForm">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                <FormItem {...restField} name={[name, "valueSelection"]}>
                  <Select>
                    {value1ParamsSelection.map((selection, index) => {
                      return <Select.Option key={selection}>{selection}</Select.Option>;
                    })}
                  </Select>
                </FormItem>
                <FormItem {...restField} name={[name, "valueInput"]}>
                  <Input
                    value={state.value}
                    onChange={(e) => {
                      setState({
                        ...state,
                        value: Number(e.target.value),
                      });
                    }}
                  />
                </FormItem>
                <Form.Item {...restField}>
                  {
                    <PlusOutLinedIcon
                      onClick={() => {
                        setUiState(!uiState);
                      }}
                    />
                  }
                </Form.Item>
                {uiState ? (
                  <>
                    <FormItem style={{ width: "10rem" }}>
                      <Input />
                    </FormItem>

                    <FormItem style={{ width: "10rem" }}>
                      <Select>
                        <Select.Option value="option1">Option1</Select.Option>
                        <Select.Option value="option2">Option2</Select.Option>
                        <Select.Option value="option3">Option3</Select.Option>
                      </Select>
                    </FormItem>
                  </>
                ) : null}
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const FormItem = styled(Form.Item)`
  width: 5rem;
`;

const PlusOutLinedIcon = styled(PlusOutlined)`
  margin: 0 3rem 0 3rem;
`;

export default Test;

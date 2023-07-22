import React, {
  ChangeEventHandler,
  Component,
  FormEventHandler,
  HTMLInputTypeAttribute,
} from "react";
import Input from "./input";
import Select from "./select";
import { IEntity } from "types";
import * as yup from "yup";

export default class Form<IProps, IState> extends Component<IProps, IState> {
  schema: yup.ObjectSchema<{}, any, {}, ""> = null as any;

  handleChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = ({
    target,
  }) => {
    const key = target.name as keyof IState;
    const value = target.value as string;

    this.setState({ [key]: value } as unknown as IState, () =>
      this.validateField(key)
    );
  };

  renderInput = (
    name: keyof IState,
    label: string,
    type?: HTMLInputTypeAttribute,
    placeholder?: string
  ) => (
    <Input
      {...{
        name: name as string,
        label,
        type,
        onChange: this.handleChange,
        // @ts-ignore
        error: this.state.errors[name],
        value: this.state[name] as string,
      }}
      placeholder={placeholder}
    />
  );

  renderSelect = (
    name: keyof IState,
    label: string,
    options: IEntity.Genre[]
  ) => (
    <Select
      {...{
        name: name as string,
        label,
        options,
        onChange: this.handleChange!,
        // @ts-ignore
        error: this.state.errors[name],
        value: this.state[name] as string,
      }}
    />
  );

  renderSubmit = (title: string) => {
    return <button className="btn btn-primary">{title}</button>;
  };

  handleError = (error: yup.ValidationError) => {
    // @ts-ignore
    const errors = { ...this.state.errors };
    for (const { path = "", message } of error.inner) errors[path] = message;
    this.setState({ errors } as any);
  };

  validateField = (name: keyof IState) => {
    const data = { [name]: this.state[name] };

    try {
      const newSchema = yup
        .object()
        .shape({ [name]: (this.schema.fields as any)[name] });
      newSchema.validateSync(data, { abortEarly: false });
      // @ts-ignore
      const errors = { ...this.state.errors };
      delete errors[name];
      this.setState({ errors } as any);
    } catch (error: any) {
      this.handleError(error);
      return null;
    }
  };

  validate = () => {
    try {
      return this.schema.validateSync(this.state, { abortEarly: false });
    } catch (error: any) {
      this.handleError(error);
      return null;
    }
  };

  handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    const values = this.validate();
    if (values) (this as any).onSubmit(values);
  };
}

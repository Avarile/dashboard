import React, { useState, ReactNode } from "react";
import { Skeleton, Switch, Card, Avatar } from "antd";
import {} from "@ant-design/icons";

interface ICardParams {
  title: string;
  style: any;
  Content: ReactNode;
}

const { Meta } = Card;

export default ({ title, style, Content }: ICardParams, loadingStatus: boolean = false) => {
  return (
    <>
      <Card style={{ ...style, boxShadow: "10px 4px 4px #b5b5b5" }} loading={loadingStatus} title={title} hoverable={false}>
        <Meta />
        {Content}
      </Card>
    </>
  );
};

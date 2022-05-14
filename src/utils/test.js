// import React, { ReactNode } from "react";

// after JSON.parse
const testData = [
  {
    title: "输煤贮煤区",
    key: "0-0",
    children: [
      {
        title: "翻车机室",
        key: "0-0-0",
        children: [
          {
            title: "翻车机室",
            key: "0-0-0-0",
            icon: "<MehOutlined />",
          },
        ],
      },
    ],
  },
];

testData.forEach((item) => {
  if (item.children.length > 1) {
    if ((item.children.icon !== undefined) | null | "") {
      return (item.children.icon = item.children.icon.replace(/\"/g, ""));
    }
  }
});

console.log(testData);

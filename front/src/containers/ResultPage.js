import React from "react";
import { Result, Button } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import Header from "../components/header";
import { Link } from "react-router-dom";
import Recommendation from "../components/recommendation";

const colors = {
  "spring!!!":
    "顔立ちははっきりしていて、明るく華やかなタイプです。実年齢よりも若々しく見えるせいでしょうか、朗らかで、キュートな雰囲気の人が多いようです。イエロー、イエローグリーン、ベージュ、コーラルピンク、オレンジなど、ソフトで華やかな色が得意です。",
  summer:
    "顔立ちはソフトで優しい印象で、上品でしっとりとした雰囲気を醸し出すタイプです。控えめでエレガントな感じが魅力ですが、おしゃれでモダンなスタイルも似合います。水色、ラベンダー、明るいネイビー、オフホワイト、ベビーピンクなど、爽やかで涼しげな色が得意です。",
  autumn:
    "吸い込まれそうな深く落ち着いた眼差しがチャームポイントです。髪の毛は豊かで重みがあり、ややマットな印象を受けます。ブラウン、モスグリーン、レンガ色、辛子色、オリーブなど、深みのある暖かな色が得意です。",
  winter:
    "顔立ちははっきりして濃い印象で、クールでシャープ、華やかな存在感が際立つタイプです。若くから成熟した雰囲気をもつ人も多く、第一印象に残りやすいタイプといえるでしょう。ブラック、ダークネイビー、ホワイト、レッド、ロイヤルブルー、ターコイズなど、強くてハードな色が得意です。",
};

const ResultPage = ({ personalColor }) => {
  return (
    <>
      <Header />
      <div
        style={{
          background:
            "linear-gradient(rgb(225, 123, 224), rgb(175, 225, 246), white)",
          height: window.innerHeight,
          transform: "translateY(-70px)",
        }}
      >
        <Result
          icon={<HeartOutlined style={{ color: "white" }} />}
          status="success"
          title={"あなたのパーソナルカラーは" + personalColor}
          subTitle={colors[personalColor]}
          extra={[
            <Recommendation personalColor={personalColor} />,
            <Link to="/color">
              <Button type="primary" key="console">
                Try Again{" "}
              </Button>
            </Link>,
          ]}
        />
      </div>
    </>
  );
};

export default ResultPage;

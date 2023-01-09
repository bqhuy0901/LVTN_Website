import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import "./LabTabs.css";

const LabTabs = () => {
  const [value, setValue] = useState("1");

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab
              sx={{ paddingRight: "40px", marginRight: "20px" }}
              label="CHÍNH SÁCH BẢO HÀNH"
              value="1"
            />
        
            <Tab
              label="LỜI KHUYÊN CHỌN GIÀY"
              value="2"
              sx={{ paddingRight: "40px", marginRight: "20px" }}
            />
          
            <Tab
              label="CÁCH ĐO SIZE GIÀY"
              value="3"
              sx={{ paddingRight: "40px", marginRight: "20px" }}
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          <div className="tab__content">
            <div className="tab_pane">
              <div className="tab_pro_content">
                <p>
                  <span>
                    ShopShoe luôn nỗ lực mang đến trải nghiệm mua sắm
                    tuyệt vời dành cho Khách Hàng từ việc đa dạng hoá mẫu mã từ
                    nhiều thương hiệu quốc tế nổi tiếng, dịch vụ tư vấn bán hàng
                    online, offline và những dịch vụ hậu mãi không ngừng được
                    hoàn thiện.
                  </span>
                </p>
                <p style={{ textAlign: "center" }}>
                  <span>
                    <img
                      className="dt-width-auto"
                      width="600"
                      height="600"
                      src={
                        "https://file.hstatic.net/200000278317/file/hinh-bao-hanh-2_ab1c35a8dd334a619cb4e6364e50b180.jpg"
                      }
                      alt="hinh 1"
                    />
                  </span>
                </p>
                <p>
                  <span>
                    Dưới đây là chính sách bảo hành của ShopShoe.
                  </span>
                </p>

                <p>
                  <span>
                    <strong>ĐIỀU KIỆN BẢO HÀNH</strong>
                  </span>
                </p>

                <p>
                  <span>
                    - ShopShoe hỗ trợ khách hàng{" "}
                    <strong>bảo hành&nbsp;sửa chữa 3 tháng </strong>miễn phí:
                  </span>
                </p>

                <ol>
                  <li>
                    <span>
                      Sản phẩm phải do chính ShopShoe&nbsp;phân
                      phối.
                    </span>
                  </li>
                  <li>
                    <span>
                      Sản phẩm còn trong thời hạn bảo hành và bị hư hỏng do lỗi
                      kỹ thuật của Nhà sản xuất:&nbsp;hở keo, tróc đế,&nbsp;đứt
                      thun, đứt chỉ.
                    </span>
                  </li>
                  <li>
                    <span>
                      Khách hàng phải xuất trình được phiếu bảo hành sản phẩm
                      hợp lệ hoặc có thông tin mua hàng đầy đủ trên hệ thống.
                    </span>
                  </li>
                </ol>

                <p>
                  <span>
                    - ShopShoe <strong>từ chối bảo hành</strong> sản
                    phẩm đối với các trường hợp:
                  </span>
                </p>

                <ol>
                  <li>
                    <span>Không có thông tin hoá đơn mua hàng</span>
                  </li>
                  <li>
                    <span>
                      Sản phẩm bị hư hỏng và lỗi từ phía khách hàng gây nên như
                      trầy xước, đế mòn, sản phẩm không còn nguyên vẹn do bị
                      động vật cắn, bảo quản không tốt gây ẩm mốc, phai nắng,
                      nóng chảy.
                    </span>
                  </li>
                </ol>

                <p>
                  <span>
                    Sau khi hết thời gian bảo hành, shop vẫn hỗ trợ sửa chữa
                    giày với chi phí hợp lý tại các cơ sở sửa chữa uy tín cho
                    quý khách hàng trong suốt quá trình sử dụng.
                  </span>
                </p>

                <p style={{ textAlign: "center" }}>
                  <span>
                    <img
                      className="dt-width-auto"
                      width="600"
                      height="600"
                      src="https://file.hstatic.net/200000278317/file/hinh-bao-hanh-1_94eef38d32944ad49ab9e2cf105e7b2c.jpg"
                      alt="hinh 2"
                    />
                  </span>
                </p>
                <p>
                  <span>
                    <strong>THỜI GIAN BẢO HÀNH</strong>
                  </span>
                </p>
                <p>
                  <span>
                    Xử lý và trao trả sản phẩm đã được sửa chữa bảo hành cho
                    khách hàng trong khoảng thời gian 05 ngày làm việc kể từ khi
                    tiếp nhận sản phẩm (trừ các tình huống đặc biệt
                    hoặc&nbsp;phải tìm chất liệu khó để thay thế, Shop sẽ liên
                    hệ và đàm phán trực tiếp với khách hàng).
                  </span>
                </p>
                <p>&nbsp;</p>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value="2">
          <p>
            <span>
              Giày đá banh chính hãng là một sản phẩm với công năng riêng biệt,
              chuyên dành cho những trận thi đấu bóng đá, từ đó mà vật liệu,
              thiết kế và cách thi công giày cũng rất riêng, khác với những dòng
              sản phẩm giày thông thường. Vậy nên để có được trải nghiệm "trên
              chân" tốt nhất, đặc biệt là với những anh em chưa có nhiều kinh
              nghiệm trong việc chọn một đôi giày đá banh phù hợp với mình, thì
              anh em có thể theo một số lời khuyên của ThanhHung Futsal như sau:
            </span>
          </p>
          <p>
            <span>
              <strong>
                1. Khi chọn size giày, anh em nên chọn size mà khi mang vào thì
                phần mũi giày và mũi chân sẽ&nbsp;vừa với nhau&nbsp;( hoặc dư
                mũi khoảng&nbsp;0.5cm hoặc dư ít hơn tuỳ vào cảm giác của anh
                em).
              </strong>
            </span>
          </p>
          <p style={{ textAlign: "center" }}>
            <span>
              <img
                className="dt-width-auto"
                width="600"
                height="600"
                src="https://file.hstatic.net/200000278317/file/trang-break-in-giay-2_8b96a8d5d72d462685947682b1963ea2.jpg"
                alt="hinh 1"
              />
            </span>
          </p>
          <p>
            <span>
              <strong>
                2. Với những đôi giày đá banh mới "cóng" thì bề ngang sẽ hơi bó
                làm anh em khó chịu vài trận đầu (có thể sẽ làm anh em mất phong
                độ 1-2 trận đầu luôn), nhưng tầm trận thứ 4, thứ 5 thì giày sẽ
                bắt đầu Break-in (giày sẽ mềm dần) và bắt đầu thuần chân của anh
                em.
              </strong>
            </span>
          </p>

          <p>
            <span>
              <em>
                Lưu ý là trong khoảng thời gian để giày&nbsp;Break-in, khi ra
                sân anh em năng nổ chạy&nbsp;một tý để giày nhanh thuần
                chân&nbsp;anh em hơn. Đừng ra sân khởi động nhẹ, sẽ làm giày lâu
                Break-in hơn.
              </em>
            </span>
          </p>
          <p style={{ textAlign: "center" }}>
            <span>
              <img
                className="dt-width-auto"
                width="600"
                height="600"
                src="https://file.hstatic.net/200000278317/file/trang-break-in-giay-1_f006461552604f3bb0cccf4fe3b64c5e.jpg"
                alt="hinh 1"
              />
            </span>
          </p>
          <p>
            <span>
              <strong>
                3.&nbsp;Hãy luôn luôn ưu tiên đến cửa hàng để được đo kích thước
                chân thật chuẩn, và được thử trực tiếp đôi giày trước khi quyết
                định mua. Ở Thanh Hùng Futsal, chúng mình luôn có bước đo chân
                bằng dụng cụ chuyên dụng và luôn khuyến khích các bạn thử giày
                thật kỹ trước khi mua.
              </strong>
            </span>
          </p>
          <p style={{ textAlign: "center" }}>
            <span>
              <img
                className="dt-width-auto"
                width="600"
                height="600"
                src="https://file.hstatic.net/200000278317/file/trang-break-in-giay-3_9804664335254ab3940fd6172881d3c7.jpg"
                alt="hinh 1"
              />
            </span>
          </p>
        </TabPanel>
        <TabPanel value="3">
          <p>
            <span style={{ textAlign: "center", fontSize: "24px" }}>
              <strong>Cách đo size chân của bạn:</strong>
            </span>
          </p>
          <p style={{ textAlign: "center" }}>
            <span>
              <img
                className="dt-width-auto"
                width="600"
                height="600"
                src="https://ttfootballshop.com/wp-content/uploads/2022/09/huong-dan-chon-giay-da-banh-2.jpg"
                alt="hinh 1"
              />
            </span>
          </p>
          <p>
            <span>
              Sau khi đo xong và chọn số đo theo bảng size chuẩn theo công thức
              tham khảo:
            </span>
          </p>

          <p>
            <span>
              <strong>
                SIZE = CHIỀU DÀI CHÂN + 0.5cm (Trừ hao chiều ngang + với)
              </strong>
            </span>
          </p>
          <p>
            <span>
              Ví dụ: Chiều dài chân 25cm, sẽ chọn size 25.5cm tương đương size
              Nike 40.5; Adidas 40 2/3; Mizuno 40.
            </span>
          </p>
          <p style={{ textAlign: "center" }}>
            <span>
              <img
                className="dt-width-auto"
                width="1254px"
                height="1524px"
                src="https://ttfootballshop.com/wp-content/uploads/2022/09/bang-quy-doi-size-giay-da-banh-scaled-e1663725461670.jpg"
                alt="hinh 1"
              />
            </span>
          </p>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default LabTabs;

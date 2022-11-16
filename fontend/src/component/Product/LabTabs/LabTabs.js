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
            <Tab label="LỜI KHUYÊN CHỌN GIÀY" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <div className="tab__content">
            <div className="tab_pane">
              <div className="tab_pro_content">
                <p>
                  <span>
                    Thanh Hùng Futsal luôn nỗ lực mang đến trải nghiệm mua sắm
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
                    Dưới đây là chính sách bảo hành của Thanh Hùng Futsal.
                  </span>
                </p>

                <p>
                  <span>
                    <strong>ĐIỀU KIỆN BẢO HÀNH</strong>
                  </span>
                </p>

                <p>
                  <span>
                    - Thanh Hùng Futsal hỗ trợ khách hàng{" "}
                    <strong>bảo hành&nbsp;sửa chữa 3 tháng </strong>miễn phí:
                  </span>
                </p>

                <ol>
                  <li>
                    <span>
                      Sản phẩm phải do chính Shop Thanh Hùng Futsal&nbsp;phân
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
                    - Thanh Hùng Futsal <strong>từ chối bảo hành</strong> sản
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
        <TabPanel value="2">Item Two</TabPanel>
      </TabContext>
    </Box>
  );
};

export default LabTabs;

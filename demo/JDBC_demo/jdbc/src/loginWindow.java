import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.sql.SQLException;

public class loginWindow extends JFrame {
   // SpringLayout springLayout=new SpringLayout();
    JPanel centerPanel=new JPanel(new FlowLayout(FlowLayout.CENTER));
    JLabel Title =new JLabel("学生管理系统",JLabel.CENTER);

    JLabel userNameLabel=new JLabel("用户名");
    JTextField userName=new JTextField();
    JLabel pwdLabel=new JLabel("密码");
    JPasswordField pwdField=new JPasswordField();
    JButton loginBtn =new JButton("登录");
    JButton resetBtn =new JButton("重置");



public loginWindow(){
    Container contentpane=getContentPane();
Title.setFont(new Font("华文行楷",Font.PLAIN,40));
Font centerfont =new Font("楷体",Font.PLAIN,20);
userNameLabel.setFont(centerfont);
pwdLabel.setFont(centerfont);
loginBtn.setFont(centerfont);
resetBtn.setFont(centerfont);
userName.setPreferredSize(new Dimension(200,30));
pwdField.setPreferredSize(new Dimension(200,30));
//centerPanel.add(Title);
    Title.setPreferredSize(new Dimension(0, 80));
centerPanel.add(userNameLabel);
userNameLabel.setBounds(100,30,50,30);
centerPanel.add(userName);
centerPanel.add(pwdLabel);
centerPanel.add(pwdField);
centerPanel.add(loginBtn);
centerPanel.add(resetBtn);
contentpane.add(Title,BorderLayout.NORTH);
contentpane.add(centerPanel,BorderLayout.CENTER);


    setSize(600,400);
 setLocationRelativeTo(null);
setDefaultCloseOperation(EXIT_ON_CLOSE);
setResizable(false);
setVisible(true);
loginBtnAddEvent(loginBtn,this);
    setResetBtnAddEvent(resetBtn,userName,pwdField);
}
void loginBtnAddEvent(JButton login,JFrame f){
    login.addMouseListener(new MouseAdapter() {
        @Override
        public void mouseClicked(MouseEvent e) {
            String username=userName.getText();
            String pwd = pwdField.getText();
            boolean flag=false;
            if(username.equals("abc")&&pwd.equals("123")){
                flag=true;
            }

            if(flag){

      dispose();
                try {
                    new tableWindow();
                } catch (SQLException | ClassNotFoundException throwables) {
                    throwables.printStackTrace();
                }
            }else{
                JOptionPane.showMessageDialog(f,"你输入的账号或密码错误,请重新输入");
            }


        }
    });
}
    void setResetBtnAddEvent(JButton login,JTextField username,JPasswordField pwd){
        login.addMouseListener(new MouseAdapter() {
            @Override
            public void mousePressed(MouseEvent e) {
                String text=login.getText();
                System.out.println(text);

                username.setText("");
                pwd.setText("");
            }
        });
    }


}

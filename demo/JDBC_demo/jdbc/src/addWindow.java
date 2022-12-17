import javax.swing.*;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.sql.SQLException;

public class addWindow extends JFrame {
tableWindow tableWindow;
JLabel idLabel=new JLabel("id",JLabel.RIGHT);
JTextField idText=new JTextField(15);
JLabel nameLabel=new JLabel("姓名",JLabel.RIGHT);
JTextField nameText=new JTextField(15);
    JLabel ageLabel=new JLabel("年龄",JLabel.RIGHT);
    JTextField ageText=new JTextField(15);
    JLabel hometownLabel =new JLabel("家乡");
    JTextField hometownText=new JTextField(15);


JPanel jPanel=new JPanel(new FlowLayout(FlowLayout.CENTER,10,20));
JButton addBtn=new JButton("添加");

    public addWindow(tableWindow tableWindow){
//super(tableWindow,"添加学生",true);
this.tableWindow=tableWindow;
idLabel.setPreferredSize(new Dimension(50,50));
nameLabel.setPreferredSize(new Dimension(50,50));
ageLabel.setPreferredSize(new Dimension(50,50));
        hometownLabel.setPreferredSize(new Dimension(50,50));
jPanel.add(idLabel);
jPanel.add(idText);
jPanel.add(nameLabel);
jPanel.add(nameText);
jPanel.add(ageLabel);
jPanel.add(ageText);
jPanel.add(hometownLabel);
jPanel.add(hometownText);
jPanel.add(addBtn);



Container contentPane=getContentPane();
contentPane.add(jPanel);
setSize(250,400);
setLocationRelativeTo(null);
setDefaultCloseOperation(DISPOSE_ON_CLOSE);
setResizable(false);
setVisible(true);
setaddBtn();

    }

  void setaddBtn(){
        addWindow addWindow=this;
        addBtn.addMouseListener(new MouseAdapter() {
            @Override
            public void mousePressed(MouseEvent e) {
                String id=idText.getText();
                String name=nameText.getText();
                String age=ageText.getText();
                String hometown=hometownText.getText();
                try {
                    tableWindow.f.add(id,name,age,hometown);
                } catch (SQLException throwables) {
                    throwables.printStackTrace();
                }
             addWindow.dispose();
                System.out.println("  addWindow.dispose();");
            }
        });

   }

}

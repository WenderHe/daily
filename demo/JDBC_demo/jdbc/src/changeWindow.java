import javax.swing.*;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.sql.SQLException;

public class changeWindow extends JFrame{
    int rowNumber;
    JLabel idLabel=new JLabel("id",JLabel.RIGHT);
    JTextField idText=new JTextField(15);

    JLabel nameLabel=new JLabel("姓名",JLabel.RIGHT);
    JTextField nameText=new JTextField(15);
    JLabel ageLabel=new JLabel("年龄",JLabel.RIGHT);
    JTextField ageText=new JTextField(15);
    JLabel hometownLabel=new JLabel("家乡");
    JTextField hometownText=new JTextField(15);
    JPanel jPanel=new JPanel(new FlowLayout(FlowLayout.CENTER,10,20));
    JButton changeBtn=new JButton("修改");
tableWindow tableWindow;
    public changeWindow(tableWindow tableWindow,int rowNumber){
      this.tableWindow=tableWindow;
      this.rowNumber=rowNumber;
     idText.setText(tableWindow.jTable.getValueAt(rowNumber,0).toString());
    idText.setEditable(false);
        nameText.setText(tableWindow.jTable.getValueAt(rowNumber,1).toString());
       ageText.setText(tableWindow.jTable.getValueAt(rowNumber,2).toString());
        hometownText.setText(tableWindow.jTable.getValueAt(rowNumber,3).toString());
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
        jPanel.add(changeBtn);



        Container contentPane=getContentPane();
        contentPane.add(jPanel);
        setSize(250,400);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(DISPOSE_ON_CLOSE);
        setResizable(false);
        setVisible(true);

setchangeBtn();
    }
   void setchangeBtn(){
        changeBtn.addMouseListener(new MouseAdapter() {
            @Override
            public void mousePressed(MouseEvent e) {
                String id=idText.getText();
                String name=nameText.getText();
                String age=ageText.getText();
                String hometown=hometownText.getText();
                try {
                    tableWindow.f.change(id,name,age,hometown);
                } catch (SQLException throwables) {
                    throwables.printStackTrace();
                }
               dispose();
            }
        });
    }
//    public int[] getselectedStudentIds(){
//        int[]selectedRows=tableWindow.jTable.getSelectedRows();
//int []ids=new int[selectedRows.length];
//        for (int i = 0; i < selectedRows.length; i++) {
//            int rowIndex=selectedRows[i];
//            Object idobj= tableWindow.jTable.getValueAt(rowIndex,0);
//            ids[i]=Integer.parseInt(idobj.toString());
//        }
//        return ids;
//    }
}

import javax.swing.*;
import javax.swing.plaf.TableHeaderUI;
import javax.swing.table.DefaultTableCellRenderer;
import javax.swing.table.DefaultTableColumnModel;
import javax.swing.table.DefaultTableModel;
import javax.swing.table.JTableHeader;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.sql.SQLException;
import java.util.Vector;

public class tableWindow extends JFrame {
    Vector<Vector<Object>>data=new Vector<>();
    DefaultTableModel tableModel=new DefaultTableModel();
    function f;
    JTable jTable;

JPanel northPanel=new JPanel(new FlowLayout(FlowLayout.LEFT));
JButton addBtn=new JButton("添加");
JButton deleteBtn =new JButton("删除");
JButton changeBtn =new JButton("修改");
JTextField serchText=new JTextField(15);
JButton searchBtn=new JButton("搜索");

//********************
    JPanel southPanel=new JPanel(new FlowLayout(FlowLayout.RIGHT));
JButton preBtn=new JButton("上一页");
JButton nextBtn =new JButton("下一页");

    public tableWindow() throws SQLException, ClassNotFoundException {
        f= new function(this);

        Container contentpane=getContentPane();

        jTable=new JTable(tableModel);
        JTableHeader jTableHeader=jTable.getTableHeader();
        jTableHeader.setFont(new Font(null,Font.BOLD,16));
        jTableHeader.setForeground(Color.red);
        jTable.setFont(new Font(null,Font.PLAIN,14));
        jTable.setForeground(Color.black);
        jTable.setGridColor(Color.black);
        jTable.setRowHeight(30);
        setTableColumnCenter(jTable);
        JScrollPane jScrollPane=new JScrollPane(jTable);
      contentpane.add(jScrollPane);

      //添加上面和下面的按钮
      northLayout(contentpane);
      southLayout(contentpane);
        setSearchBtn();
        setPreBtn();
        setNextBtn();
        setAddBtn();
        setChangeBtn();
        setDeleteBtn();
        setSize(1200,800);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setResizable(false);
        setVisible(true);


    }
    public void setTableColumnCenter(JTable table){         //让表格数据居中显示
        DefaultTableCellRenderer r = new DefaultTableCellRenderer();
        r.setHorizontalAlignment(JLabel.CENTER);
        table.setDefaultRenderer(Object.class, r);
    }
 void northLayout(Container contentpane){
       northPanel.add(addBtn);
       northPanel.add(deleteBtn);
       northPanel.add(changeBtn);
       northPanel.add(serchText);
       northPanel.add(searchBtn);
       contentpane.add(northPanel,BorderLayout.NORTH);
 }

    void southLayout(Container contentpane){
       southPanel.add(preBtn);
       southPanel.add(nextBtn);

        contentpane.add(southPanel,BorderLayout.SOUTH);
    }

     void setSearchBtn(){
        searchBtn.addMouseListener(new MouseAdapter() {
            @Override
            public void mousePressed(MouseEvent e) {
                String text=serchText.getText();
                serchText.setText("");
                try {
                    f.search(text);
                } catch (SQLException throwables) {
                    throwables.printStackTrace();
                }
            }
        });
     }
     void setPreBtn(){
        preBtn.addMouseListener(new MouseAdapter() {
            @Override
            public void mousePressed(MouseEvent e) {
                f.prePage();
            }
        });


     }
     void setNextBtn(){
        nextBtn.addMouseListener(new MouseAdapter() {
            @Override
            public void mousePressed(MouseEvent e) {
                f.nextPage();

            }
        });
     }
     void setAddBtn(){
        tableWindow t=this;
        addBtn.addMouseListener(new MouseAdapter() {
            @Override
            public void mousePressed(MouseEvent e) {
                new addWindow(t);
            }
        });

     }
     void setChangeBtn(){
         tableWindow t=this;
        changeBtn.addMouseListener(new MouseAdapter() {
            @Override
            public void mousePressed(MouseEvent e) {

                    int[]selectedRows=jTable.getSelectedRows();
//                    int []ids=new int[selectedRows.length];
//                    for (int i = 0; i < selectedRows.length; i++) {
//                        int rowIndex=selectedRows[i];
//                        Object idobj= jTable.getValueAt(rowIndex,0);
//                        ids[i]=Integer.parseInt(idobj.toString());
//                    }
                    if(selectedRows.length!=1){
                        JOptionPane.showMessageDialog(t,"一次只能修改一个");
                    }else{
                       new changeWindow(t,selectedRows[0]);
                    }

            }
        });

     }

     void setDeleteBtn(){

        tableWindow t=this;
        deleteBtn.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseReleased(MouseEvent e) {

                int[]selectedRows=jTable.getSelectedRows();
                    int []ids=new int[selectedRows.length];
                    for (int i = 0; i < selectedRows.length; i++) {
                        int rowIndex=selectedRows[i];
                        Object idobj= jTable.getValueAt(rowIndex,0);
                        ids[i]=Integer.parseInt(idobj.toString());
                    }
                    int option=JOptionPane.showConfirmDialog(t,"确认要删除选择的行吗","确认删除",JOptionPane.YES_NO_OPTION);
                    if(option==JOptionPane.YES_OPTION){

                        try {
                            f.delete(ids);
                        } catch (SQLException throwables) {
                            throwables.printStackTrace();
                        }
                    }



            }
        });
     }
}

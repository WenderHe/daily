import java.sql.*;
import java.util.Vector;

public class function {
    tableWindow tableWindow;
    Vector<String>colums=new Vector<>();
    static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
    static final String DB_URL = "jdbc:mysql://10.102.219.228:3306/def?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC";
    static final String USER = "root";
    static final String PASS = "He200203";
    final int listsContents=10;
    int currentPage=0;   //从零开始
int firstIndex=0;
Vector<Vector<Object>> flushData=new Vector();

    Connection conn = null;
    Statement stmt = null;
    ResultSet rs=null;







//        Vector<Object> l1=new Vector();
//        l1.addElement("001");
//        l1.addElement("zhangsan");
//        l1.addElement(2020);
//        l1.addElement("henan");
//        data.addElement(l1);
//
//
//        tableModel.setDataVector(data,colums);

    public function(tableWindow tableWindow) throws ClassNotFoundException, SQLException {
        this.tableWindow=tableWindow;
        Class.forName(JDBC_DRIVER);

        // 打开链接
        System.out.println("连接数据库...");
        conn = DriverManager.getConnection(DB_URL,USER,PASS);

        // 执行查询
        System.out.println(" 实例化Statement对象...");
        stmt = conn.createStatement();


        //***********************
        colums.addElement("学号");
        colums.addElement("姓名");
        colums.addElement("年龄");
        colums.addElement("家乡");
       initialSearch();
    }
    void initialSearch() throws SQLException {

        String sql="select * from students";
       rs= stmt.executeQuery(sql);
        addFlushData(rs);
page();

    }
   void search(String keyWords) throws SQLException {
        firstIndex=10*currentPage;
     String s1="select * from students ";
     StringBuilder sb=new StringBuilder();
     sb.append(s1);
     sb.append("where name like ");
     sb.append("'%");
     sb.append(keyWords);
     sb.append("%' or ");
     sb.append("id like ");
       sb.append("'%");
       sb.append(keyWords);
       sb.append("%' or ");
       sb.append("age like ");
       sb.append("'%");
       sb.append(keyWords);
       sb.append("%'");
       String sql=sb.toString();
       System.out.println(sql);
    rs= stmt.executeQuery(sql);
       System.out.println(rs);
addFlushData(rs);
page();




   }
   void add(String id,String name,String age,String hometown) throws SQLException {
StringBuilder s=new StringBuilder();
s.append("insert into students (id,name,age,home) ");
s.append("values (");
s.append(id).append(",");
       s.append("'").append(name).append("'").append(",");
       s.append(age).append(",");
       s.append("'").append(hometown).append("'").append(")");
String sql=s.toString();
       System.out.println(sql);

stmt.executeUpdate(sql);
       System.out.println("stmt.executeUpdate(sql);");
initialSearch();



   }
   void delete(int []ids) throws SQLException {
StringBuilder s=new StringBuilder();
s.append("delete from students where");
       for (int i = 0; i < ids.length; i++) {
           s.append(" id=");
           s.append(ids[i]);
           if(i!=ids.length-1){
               s.append(" or");
           }



       }
String sql=s.toString();
       System.out.println(sql);
       stmt.executeUpdate(sql);
       initialSearch();

   }
   void change(String id,String name,String age,String hometown) throws SQLException {
StringBuilder s=new StringBuilder();
s.append("update students set name=").append("'");
s.append(name).append("'").append(",");
s.append("home='").append(hometown).append("',");
s.append("age=").append(age).append(" ");
s.append("where id=").append(id);
String sql=s.toString();
       System.out.println(sql);
stmt.executeUpdate(sql);
initialSearch();

   }
public void addFlushData(ResultSet rs) throws SQLException {
//    tableWindow.data.clear();
    flushData.clear();
        while (rs.next()){

            Vector<Object> list=new Vector<>();
            int id=rs.getInt(1);
            System.out.println(id);
            String name=rs.getString(2);
            System.out.println(name);
            int age=rs.getInt(3);
            System.out.println(age);
            String hometown=rs.getString(4);
        list.addElement(id);
            list.addElement(name);
            list.addElement(age);
            list.addElement(hometown);
flushData.add(list);

//            tableWindow.data.addElement(list);


        }

    //tableWindow.tableModel.setDataVector(tableWindow.data,colums);
}
void page(){
        tableWindow.data.clear();
        int count=0;
        int firstIndex=listsContents*currentPage;

    for (int i = firstIndex; i < flushData.size(); i++) {
        Vector<Object> v=flushData.get(i);
        tableWindow.data.addElement(v);


        count++;
        if(count==10){

            break;
        }



    }

    tableWindow.tableModel.setDataVector(tableWindow.data,colums);

}

void prePage(){
        if(currentPage>=1){
            currentPage--;
        }
        page();
}

void nextPage(){
        int limit=(int)(flushData.size()/10);
        if(flushData.size()%10==0){
            limit--;
        }
        if(currentPage<limit){
            currentPage++;
        }
        page();

}


}
